import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPRest } from "@pnp/sp";
import ReactPlayer from "react-player";
export interface IVideosProps {
	sp: SPRest;
	isArabic: boolean;
	isLoader: any;
	formatDate: any;
}
export default class Videos extends React.Component<
	IVideosProps,
	{ content: any; activeMedia: string }
> {
	constructor(props) {
		super(props);
		this.state = { content: [], activeMedia: "" };
	}
	public componentDidMount(): void {
		this.getContent();
	}
	getContent = async () => {
		this.props.isLoader(true);
		var content = await this.props.sp.web.lists
			.getByTitle("KnowledgeBase")
			.items.filter(
				`ContentType eq 'Knowledge -  All Project Management Office And Project Management Office Materials'`
			)();
		this.setState(
			{
				content: content,
				activeMedia: content[0].ImagesVideos.Url,
			},
			() => {
				this.props.isLoader(false);
			}
		);
	};
	itemOverlayClick = (e, url) => {
		e.stopPropagation();
		this.setState({ activeMedia: url });
	};
	public render(): React.ReactElement<IVideosProps> {
		return (
			<div className="videoTab">
				<h2 className="tabContentTitle Resources" data-trans-videoTabTitle>
				المحتويات المرئية لمكتب إدارة المشاريع
				</h2>
				<div className="videosContainer row">
					<div className="videoPlayer col-12 mb-4">
						<ReactPlayer
							className="react-player"
							controls={true}
							light={true}
							// playIcon={
							// 	<button className="playBtn">
							// 		<Icon iconName="Play"></Icon>
							// 	</button>
							// }
							url={this.state.activeMedia}
						/>
					</div>
					<div className="thumbnailContainer d-flex flex-wrap col-12 px-0">
						{this.state.content.length &&
							this.state.content.map((el) => {
								return [
									<div className="thumbnailItem col-12 col-md-6 col-lg-4 mb-3">
										<ReactPlayer
											className="react-playerSmall"
											controls={false}
											// light="https://i.stack.imgur.com/mTbEU.png"
											light={true}
											// playIcon={
											// 	<button className="playBtn">
											// 		<Icon iconName="Play"></Icon>
											// 	</button>
											// }
											url={el.ImagesVideos.Url}
										/>
										<div
											className={`itemOverlay d-flex align-items-end ${
												el.ImagesVideos.Url == this.state.activeMedia &&
												"active"
											}`}
											onClick={(e) => {
												this.itemOverlayClick(e, el.ImagesVideos.Url);
											}}
										>
											<div className="mediaTitleWrapper">
												<h3 className="mediaTitle">
													{this.props.isArabic ? el.TitleAR : el.Title}
												</h3>
											</div>
										</div>
									</div>,
								];
							})}
					</div>
				</div>
			</div>
		);
	}
}
