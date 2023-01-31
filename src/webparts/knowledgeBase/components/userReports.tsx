import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { SPRest } from "@pnp/sp";
export interface IUserReportsProps {
	sp: SPRest;
	isArabic: boolean;
	isLoader: any;
	formatDate: any;
	typeClickId?: any;
}
export default class UserReports extends React.Component<
	IUserReportsProps,
	{ content: any }
> {
	constructor(props) {
		super(props);
		this.state = { content: [] };
	}
	public componentDidMount(): void {
		this.getContent();
	}
	getContent = async () => {
		this.props.isLoader(true);
		var content = await this.props.sp.web.lists
			.getByTitle("KnowledgeBase")
			.items.filter(`ContentType eq 'Knowledge - User Visit Analysis Report'`)();
		this.setState({ content: content }, () => {
			this.props.isLoader(false);
		});
	};
	public render(): React.ReactElement<IUserReportsProps> {
		return (
			<div className="guideBook">
				<h2 className="tabContentTitle border-0 Resources" data-trans-userReports>
					تقرير تحليل زيارة المستخدمي
				</h2>
				<div className="table-responsive">
					<table className="table userReportsTable">
						<thead>
							<tr className="tableHeaders">
								<th scope="col">#</th>
								<th className="Resources" scope="col" data-trans-reportName>
									First
								</th>
								<th className="Resources" scope="col" data-trans-reportType>
									Last
								</th>
								<th className="Resources" scope="col" data-trans-date>
									Handle
								</th>
								<th className="Resources" scope="col" data-trans-takeAction>
									Handle
								</th>
							</tr>
						</thead>
						<tbody>
							{this.state.content.length > 0 &&
								this.state.content.map((el, i) => {
								
									return [
										<tr className={`guideRow ${(this.props.typeClickId == el.Id) ? 'guidebackground' : ''}`} >
											<th scope="row">{i + 1}</th>
											<td>{this.props.isArabic ? el.TitleAr : el.Title}</td>
											<td>{el.ReportType}</td>
											<td>{this.props.formatDate(el.Date1)}</td>
											<td className="linkTd">
												{this.props.isArabic ? (
													<a href={`${el.HyperlinkAR.Url}`} download>
														<Icon iconName="Down" />
														<span className="linkText">
															{el.HyperlinkAR.Description}
														</span>
													</a>
												) : (
													<a href={`${el.HyperlinkEN.Url}`} download>
														<Icon iconName="Down" />
														<span className="linkText">
															{el.HyperlinkEN.Description}
														</span>
													</a>
												)}
											</td>
										</tr>,
									];
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
