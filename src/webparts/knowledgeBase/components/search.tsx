import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { SPRest } from "@pnp/sp";
import ReactHtmlParser from "react-html-parser";
import { graph } from "@pnp/graph";
import "@pnp/graph/search";
import { ICamlQuery } from "@pnp/sp/lists";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
// import mediator from "../../../../node_modules/spm-base/system.Utilities/miscellaneous.Utilities/translateMediatorForTs.js";
// import Resources from "../../../../src/helperCode/utilities.Config/system.Config/resources.js"
// import Resources from "../../../../src/HelperCode/Utilities.Core/Resources.js"



export interface ISystemUpdatesProps {
	sp: SPRest;
	isArabic: boolean;
	isLoader: any;
	formatDate: any;
	typeClick?:any;
	
}
export default class SystemUpdates extends React.Component<
	ISystemUpdatesProps,
	{ content: any; searchText: string }
> {
	constructor(props) {
		super(props);
		this.state = { content: [], searchText: "" };
	}

	// translatetypes = this.props.isArabic ? Resources.ar : Resources.en
	translatetypes =""

	public componentDidMount(): void {


		this.getFields();
	}
	fields = [];
	myFields = [];
	searchLabel = this.props.isArabic ? "البحث في أسس المعرفة" : "Search Knowledge Base"
	// get list fields and there types for caml query
	getFields = async () => {
		this.fields = await this.props.sp.web.lists
			.getByTitle("KnowledgeBase")
			.fields.filter("ReadOnlyField eq false and Hidden eq false")
			.get();

		this.fields = this.fields.filter((el) => {
			return (
				el.TypeAsString == "Text" ||
				el.TypeAsString == "Choice" ||
				el.TypeAsString == "Note" ||
				el.TypeAsString == "URL"
			);
		});
		this.setCamlQuery(this.fields);
	};
	// set caml query based on fields recieved in previous step
	setCamlQuery = (fields) => {
		this.myFields = [];
		var myCaml = ``,
			myWhere = ``;
		fields.forEach((el, i) => {
			if (i != fields.length - 1) {
				myWhere += `<Or>
						<Contains><FieldRef Name="${el.InternalName}" />
							<Value Type="${el.TypeAsString}">${this.state.searchText}</Value>
				   		</Contains>`;
			} else {
				//last child
				myWhere += `<Contains><FieldRef Name="${el.InternalName}" />
						<Value Type="${el.TypeAsString}">${this.state.searchText}</Value>
					</Contains>`;
				var count = (myWhere.match(/<Or>/g) || []).length;
				var ORC = "</Or>".repeat(count);
				myWhere += ORC;
			}
			this.myFields.push(el.InternalName);
		});
		myCaml = `<View>
			<Query>
				<Where>
					${myWhere}
				</Where>
			</Query>
		</View>`;
		this.getContent(myCaml);
	};
	// call list and get search results
	getContent = async (myCaml) => {
		this.props.isLoader(true);

		const caml: ICamlQuery = {
			ViewXml: myCaml,
		};
		const content = await this.props.sp.web.lists
			.getByTitle("KnowledgeBase")
			.getItemsByCAMLQuery(caml);
		var myResults = [];
		content.forEach((el) => {

			// iterate over all properties
			for (var name in el) {
				if (
					this.myFields.includes(name) &&
					typeof el[name] != "object" &&
					el[name]
				) {
					if (
						el[name]
							.toLocaleLowerCase()
							.includes(this.state.searchText.toLocaleLowerCase())
					) {
						console.log(name, el[name]);
						myResults.push({
							type: el.KnowledgeSection,
							result: el[name],
							id:el.Id
						});
					}
				}
			}
		});

		this.setState({ content: myResults }, () => {
			this.props.isLoader(false);
			// mediator.init(); // like changeResources function

		});
	};


	typeClickHandler =(el)=>{
		console.log(el,"El inside type click handler")
		this.props.typeClick(el)
	}


	public render(): React.ReactElement<ISystemUpdatesProps> {
		return (
			<div className="searchTab row">
				<div className="col-12 mb-4">
					<SearchBox
						labelText={this.searchLabel}
						underlined={true}
						onSearch={(newValue) => {
							this.setState({ searchText: newValue }, () => {
								this.setCamlQuery(this.fields);
							});
						}}
					/>
				</div>

				<div className="searchResults col-12">
					{this.state.content.length
						? this.state.content.map((el, i, a) => {
							var typetranslate = { key: `data-trans-${el.type.replaceAll(" ", "").toLowerCase()}` }
							return [
								i == 0 ? (
									<div className="resultLength mb-4">
										<span className="Resources" data-trans-resultnumber>Number of results: </span>
										<span> {this.state.content.length}</span>
									</div>
								) : (
									""
								),
								<div className="result mb-4 text-break eventcursor" onClick={()=>this.typeClickHandler(el)}>
									<div className="resultTitleWrapper">
										<h3 className="resultTitle">
											{ReactHtmlParser(
												el.result
													? el.result.replace(/(.{250})..+/, "$1 ...")
													: ""
											)}
										</h3>
									</div>
									<div className="typeWrapper">
										<div className="contentType Resources" >{this.translatetypes.hasOwnProperty(el.type.replaceAll(" ", "").toLowerCase()) ? this.translatetypes[el.type.replaceAll(" ", "").toLowerCase()] : el.type}</div>
									</div>
								</div>,
							];
						})
						: ""}
				</div>
			</div>
		);
	}
}
