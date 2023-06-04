import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { SPRest } from "@pnp/sp";
import { ICamlQuery } from "@pnp/sp/lists";
export interface ILessonsLearnedProps {
	sp: SPRest;
	isArabic: boolean;
	isLoader: any;
	formatDate: any;
}
export default class LessonsLearned extends React.Component<
	ILessonsLearnedProps,
	{ content: any }
> {
	constructor(props) {
		super(props);
		this.state = { content: [] };
	}

	noData = this.props.isArabic ? "لا يوجد" : "No Data"
	lessonsLearned = this.props.isArabic ? "مركز الدرس المستفاد" : "Lessons Learned"
	lessonTitle = this.props.isArabic ? "العنوان" : "Title"
	date = this.props.isArabic ? "التاريخ" : "Date"
	type = this.props.isArabic ? "النوع" : "Type"
	source = this.props.isArabic ? "المصدر" : "Source"

	public componentDidMount(): void {
		this.getProjects();
	}
	getProjects = async () => {
		this.props.isLoader(true);
		const caml: ICamlQuery = {
			//  ! Make sure there are no lines or spaces in <Value> tag
			ViewXml: `
				<View>
					<Query>
						<Where>
							<Eq>
								<FieldRef Name="Status"/>
								<Value Type="Choice">completed</Value>
							</Eq>
						</Where>
					</Query>
				</View>
				`,
		};
		const projects = await this.props.sp.web.lists
			.getByTitle("Projects")
			.getItemsByCAMLQuery(caml);
		var projectsCodes = [];
		projects.forEach((el) => {
			projectsCodes.push(el.Title);
		});
		//build <In>
		var myCaml = `<In><FieldRef Name="ProjectCode" /><Values>`;
		projects.forEach((el) => {
			myCaml += `<Value Type="Text">${el}</Value>`;
		});
		myCaml += `</Values></In>`;
		projectsCodes.length ? this.getContent(myCaml) : this.props.isLoader(false);
	};
	getContent = async (myCaml) => {
		const caml: ICamlQuery = {
			ViewXml: myCaml,
		};
		const content = await this.props.sp.web.lists
			.getByTitle("Lessons Learned")
			.getItemsByCAMLQuery(caml);
		this.setState({ content: content }, () => {
			this.props.isLoader(false);
		});
	};
	public render(): React.ReactElement<ILessonsLearnedProps> {
		return (
			<div className="guideBook">
				<h2 className="tabContentTitle Resources" data-trans-lessonsLearned>
					{this.lessonsLearned}
				</h2>
				<div className="ctx-block Listing-wrapper">
					<ul className="list-group w-100">
						{this.state.content.length
							? this.state.content.map((el, i) => {
								return [
									<li className="list-group-item link-arrow">
										<a
											id={`ID${i}`}
											className="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor"
											href={`/SitePages/View.aspx?ListKey=lessonslearned&IID=${el.Id}`}
										>
											<div className="d-inline-flex flex-column col-3">
												<h4 className="acc-title">{el.Name}</h4>
												<span className="des-13">
													<span className="state-val Resources" data-trans-title>
														{this.lessonTitle}
													</span>
												</span>
											</div>
											<div className="d-inline-flex wordBreak flex-column col-3">
												<h4 className="acc-title ">
													{this.props.formatDate(el.Date)}
												</h4>
												<span className="des-13">
													<span className="state-val Resources" data-trans-date>
														{this.date}
													</span>
												</span>
											</div>
											<div className="d-inline- wordBreak flex-column col-3">
												<h4 className="acc-title  Resources">
													{el.Classification}
												</h4>
												<span className="des-13">
													<span className="state-val Resources" data-trans-type>
														 {this.type}
													</span>
												</span>
											</div>
											<div className="d-inline-flex wordBreak flex-column pr-03-medium col-3">
												<h4 className="acc-title  Resources">{el.Source}</h4>
												<span className="des-13">
													<span className="state-val Resources" data-trans-source>
														 {this.source}
													</span>
												</span>
											</div>
										</a>
									</li>,
								];
							})
							: <span className="Resources" data-trans-nodata>{this.noData}</span>}
					</ul>
				</div>
			</div>
		);
	}
}
