// third lib
import React, { useState, useEffect, useMemo } from "react";
import { FormattedMessage as Intl } from "react-intl";
import ScrollBar from "react-perfect-scrollbar";
import cn from "classnames";

/* material-ui */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import LaunchIcon from "@material-ui/icons/Launch";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

/* local components & methods */
import FormDataDisplay from "./FormDataDisplay";
import styles from "./styles.module.scss";
import Loading from "src/icons/Loading";
import HeadLine from "@comp/HeadLine";
import { getRequestDetail, getFormItem } from "@lib/api";
import { sendNotify } from "src/utils/systerm-error";
import Text from "@comp/Text";
import CallModal from "@comp/CallModal";

const RequestDetail = ({ recordId, approvedView }) => {
  const [formLoading, setFormLoading] = useState(true);
  const [tableList, setTableList] = useState([]);
  const [formId, setFormId] = useState();
  const [latestId, setLatestId] = useState();
  const [formData, setFormData] = useState();
  const [changeData, setChangeData] = useState();
  const [editView, setEditView] = useState(false);
  const [defaultData, setDefaultData] = useState({
    index: 0,
    data: null,
  });
  const [modalData, setModalData] = useState({
    open: false,
    status: 0,
    content: "",
  });

  const buttonClickHandle = () => {
    setDefaultData(changeData);
    setModalData({ ...modalData, open: false });
  };

  const InitDetailPage = () => {
    setFormLoading(true);

    getRequestDetail({ id: recordId })
      .then((res) => {
        if (res.code === 200) {
          let latestRecord = res.data[0];
          let formId = latestRecord.form_id;
          res.data.forEach((item) => {
            if (item.createTime > latestRecord.createTime) latestRecord = item;
          });
          setDefaultData({ index: 0, data: latestRecord });
          setLatestId(latestRecord.id);
          setTableList(res.data);
          getFormItem({
            id: formId,
          })
            .then((res2) => {
              if (res2.code === 200) {
                let data = res2.data;
                setFormData(data);
                setFormId(formId);
                setFormLoading(false);
              }
            })
            .catch((e) => {
              sendNotify({ msg: e.message, status: 3, show: true });
            });
        }
      })
      .catch((e) => {
        sendNotify({ msg: e.message, status: 3, show: true });
      });
  };

  useEffect(() => {
    setFormLoading(true);
    if (recordId) {
      InitDetailPage();
    }
  }, []);

  return (
    <div className={styles.requestDetail}>
      {formLoading && <Loading></Loading>}

      {!formLoading && (
        <div className={styles.detailContent}>
          <div className={styles.form}>
            <ScrollBar>
              <div className={styles.mainContent}>
                <div
                  className={styles.onBack}
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <ArrowBackIcon />
                  <Text type="subTitle">
                    <Intl id="back" />
                  </Text>
                </div>
                <FormDataDisplay
                  formId={formId}
                  formTemplate={formData}
                  recordId={recordId}
                  approvedView={approvedView}
                  defaultData={defaultData}
                  enableReOpen={defaultData.index === 0}
                  submitCallback={(id) => {
                    InitDetailPage();
                  }}
                  setEditView={setEditView}
                />
              </div>
            </ScrollBar>
          </div>

          <div className={styles.history}>
            <ScrollBar>
              <div className={styles.historyContent}>
                <HeadLine>
                  <Intl id="historyRecord" />
                </HeadLine>
                <div className={styles.historyTable}>
                  <List>
                    {tableList.map((row, index) => (
                      <ListItem
                        key={index}
                        className={cn({
                          [styles["active"]]: defaultData.index === index,
                        })}
                      >
                        <ListItemText>{row.history_id}</ListItemText>
                        <ListItemText>
                          <div className={styles.timeStamp}>
                            <TodayIcon />
                            {row.create_time}
                          </div>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <LaunchIcon
                            onClick={() => {
                              if (editView) {
                                setChangeData({
                                  index: index,
                                  data: row,
                                });
                                setModalData({
                                  ...modalData,
                                  open: true,
                                  status: 1,
                                  content:
                                    "Switch to this record will miss your current input.",
                                });
                              } else {
                                setDefaultData({
                                  index: index,
                                  data: row,
                                });
                              }
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </ScrollBar>
          </div>
        </div>
      )}

      <CallModal
        open={modalData.open}
        content={modalData.content}
        status={modalData.status}
        buttonClickHandle={buttonClickHandle}
        handleClose={() => {
          setModalData({ ...modalData, open: false });
        }}
      />
    </div>
  );
};

export default RequestDetail;