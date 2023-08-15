import * as React from "react";
import "../knowledgeBase.css";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { SPRest } from "@pnp/sp";
export interface IGuideLineBookProps {
  sp: SPRest;
  isArabic: boolean;
  isLoader: any;
  formatDate: any;
  typeClickId: any;
}
export default class GuideLineBook extends React.Component<
  IGuideLineBookProps,
  { content: any }
> {
  constructor(props) {
    super(props);
    this.state = { content: [] };


  }
  guideLineBook = this.props.isArabic ? "كتاب المواد التوجيهية والنماذج" : "Guidelines and templates book"
  bookName = this.props.isArabic ? "اسم الملف" : "File Name"
  bookType = this.props.isArabic ? "نوع الملف" : "File Type"
  date =this.props.isArabic ? "التاريخ" : "Date"
  takeAction = this.props.isArabic ? "تنزيل" : "Download"
  public componentDidMount(): void {
    this.getContent();
  }
  getContent = async () => {
    this.props.isLoader(true);
    var content = await this.props.sp.web.lists
      .getByTitle("KnowledgeBase")
      .items.filter(`ContentType eq 'Knowledge - Guideline Book'`)();
    this.setState({ content: content }, () => {
      this.props.isLoader(false)
    });
  };
  public render(): React.ReactElement<IGuideLineBookProps> {
    return (
      <div className="guideBook">
        <h2 className="tabContentTitle border-0 Resources" data-trans-guideLineBook>{this.guideLineBook}</h2>
        <div className="table-responsive">
          <table className="table guideBookTable">
            <thead>
              <tr className="tableHeaders">
                <th scope="col">#</th>
                <th className="Resources" scope="col" data-trans-bookName>
                  {this.bookName}
                </th>
                <th className="Resources" scope="col" data-trans-bookType>
                {this.bookType}
                </th>
                <th className="Resources" scope="col" data-trans-date>
                  {this.date}
                </th>
                <th className="Resources" scope="col" data-trans-takeAction>
                  {this.takeAction}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.content.length > 0 &&
                this.state.content.map((el, i) => {

                  return [
                    <tr className={`guideRow ${(this.props.typeClickId == el.Id) ? 'guidebackground' : ''}`} >
                      <th scope="row">{i + 1}</th>
                      <td>{this.props.isArabic ? el.TitleAR : el.Title}</td>
                      <td>{el.BookType}</td>
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
