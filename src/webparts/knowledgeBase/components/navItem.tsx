import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
export interface INavItemProps {
	activeTab: number;
	tabIndex: number;
	setActiveTab: any;
	title: string;
	clearTypeClickId:any
}
export default class NavItem extends React.Component<INavItemProps, {}> {
	constructor(props) {
		super(props);
		this.state = {};
	}
	public componentDidMount(): void {}
	public render(): React.ReactElement<INavItemProps> {
		return (
			<div
				className={`knowledgeNavItem mb-3 ${
					this.props.activeTab == this.props.tabIndex && "activeTab"
				}`}
			>
				<a
					className="tabLink"
					href="javascript:"
					onClick={() => {
						this.props.setActiveTab(this.props.tabIndex);
						this.props.clearTypeClickId()
					}}
				>
					<span className="navText">
						{this.props.title}
					</span>
				</a>
			</div>
		);
	}
}
