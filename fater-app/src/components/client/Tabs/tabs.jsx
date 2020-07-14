import React, { Component } from "react";

import "./tabs.css";
import { IonIcon } from "@ionic/react";
import { layers, cloudDownload, documentText, person } from "ionicons/icons";
import LayersTabContent from "./layersTabContent/LayersTabContent";
import DownloadTabContent from "./DownloadTabContent/DownloadTabContent";
import ReportsTabContent from "./ReportsTabContent/ReportsTabContent";
import UserTabContent from "./UserTabContent/UserTabContent";

class Tabs extends Component {
  render() {
    return (
      <>
        <ul className="nav nav-tabs nav-justified" id="ma-tab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="layers-tab"
              data-toggle="tab"
              href="#layers"
              role="tab"
              aria-controls="layers"
              aria-selected="true"
            >
              <IonIcon icon={layers} />
              <br />
              لایه‌ها
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="download-tab"
              data-toggle="tab"
              href="#download"
              role="tab"
              aria-controls="download"
              aria-selected="false"
            >
              <IonIcon icon={cloudDownload} />
              <br />
              دانلود
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="reports-tab"
              data-toggle="tab"
              href="#reports"
              role="tab"
              aria-controls="reports"
              aria-selected="false"
            >
              <IonIcon icon={documentText} />
              <br />
              گزارش‌ها
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="user-tab"
              data-toggle="tab"
              href="#user"
              role="tab"
              aria-controls="user"
              aria-selected="false"
            >
              <IonIcon icon={person} />
              <br />
              کاربر
            </a>
          </li>
        </ul>
        <div className="tab-content" id="ma-tab-content">
          <LayersTabContent />
          <DownloadTabContent />
          <ReportsTabContent />
          <UserTabContent />
        </div>
      </>
    );
  }
}

export default Tabs;
