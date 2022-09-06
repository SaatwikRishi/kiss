import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Router, Link, navigate, useLocation} from '@reach/router';
import _ from 'lodash';
import {
  Tabs,
  List,
  Card,
  Layout,
  Spin,
  Tag,
  Row,
  Col,
  Input,
  Divider,
  Space,
  message,
  Button,
  Table,
  Switch,
} from 'antd';
const {Content} = Layout;
import {
  ReconciliationOutlined,
  FormOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import moment, {relativeTimeRounding} from 'moment-timezone';
/**
 * Actions
 */
import {
  getUser,
  getAllEvents,
  getCategoryListforEvents,
} from '../../ngo/store/actions';
import Item from 'antd/lib/list/Item';

const Index = props => {
  const dispatch = useDispatch();
  const location = useLocation();
  const eventsStore = useSelector(state => state.events);
  const [state, setState] = useState({
    isLoading: true,
    search: null,
    searchResult: [],
  });


  /**
   * Scroll to Top
   */

  useEffect(() => {
    setTimeout(() => {
      document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 50);
  }, [location.pathname]);

  /*     if(eventsStore.eventList.loading){
            dispatch(getUser());
            dispatch(getAllEvents());
            dispatch(getCategoryListforEvents());
        } */

  /**
   * getForm data  from Store
   */ const columns = [
    {
      title: 'Name',
      dataIndex: 'event_name',
      render: name => {
        return (
          <Link
            to={`/listing/${
              eventsList.filter(e => e.event_name == name)[0].eventid
            }`}
          >
            {name}
          </Link>
        );
      },
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'event_name'),
    },
    {
      title: 'Description',
      dataIndex: 'event_desc',
      width: '20%',
      render: function(html) {
        return (
          <p
            dangerouslySetInnerHTML={{
              __html: html.length > 50 ? html.substring(0, 50) + '...' : html,
            }}
          />
        );
      },
      sorter: (a, b) => lib.NumberStringSort(a, b, 'studentid'),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'start_date'),
      render: (text, record) => {
        const date = new Date(text);
        return (
          <>
            {' '}
            {(date.getDate() < 10 ? '0' : '') +
              date.getDate() +
              '-' +
              (date.getMonth() < 9 ? '0' : '') +
              (date.getMonth() + 1) +
              '-' +
              date.getFullYear()}
          </>
        );
      },
    },
    {
      title: 'Last Date',
      dataIndex: 'end_date',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'end_date'),
      render: (text, record) => {
        const date = new Date(text);
        return (
          <>
            {' '}
            {(date.getDate() < 10 ? '0' : '') +
              date.getDate() +
              '-' +
              (date.getMonth() < 9 ? '0' : '') +
              (date.getMonth() + 1) +
              '-' +
              date.getFullYear()}
          </>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'catid',
      width: '40%',
      render: html => {
        const category = categoryList.filter(e => e.id == html)[0];
        return <Tag color={'green'}>{category.name}</Tag>;
      },
      sorter: (a, b) => lib.NumberStringSort(a, b, 'catid'),
    },
  ];
  const getEventStoreData = () => {
    let mainObj = eventsStore ? eventsStore : {};
    let categoryList = mainObj.categoryList ? mainObj.categoryList : {};

    let eventList = mainObj.eventList ? mainObj.eventList : {};

    return {
      categoryList: {
        loading: true,
        data: [],
        ...categoryList,
      },
      eventList: {
        loading: true,
        data: [],
        ...eventList,
      },
    };
  };

  let eventsData = getEventStoreData();

  /**
   * Loading message
   */
  useEffect(() => {
    if (eventsData.eventList.loading) {
      message.success('Loading . . .');
    } else {
      setState({...state, isLoading: false});
    }
  }, [eventsData.eventList.loading]);
  /**
   * category List and Events count
   */
  /*     let categoryList = _(eventsData.eventList.data).groupBy('catid').value()
    
        categoryList = _(categoryList).map((val, key) => {
            let name = _(eventsData.categoryList.data).filter(v => v.catid == key).value();
            name = name.length ? name[0].name : 'Others';
            return { categoryName: name, data: val }
        }).value() */

  let categoryList = _(eventsData.categoryList.data)
    .map(rec => {
      return {name: rec && rec.name, id: rec && rec.catid};
    })
    .value();
  let eventsList = _(eventsData.eventList.data)
    .map(rec => {
      return {...rec, category: _.find(categoryList, {id: rec.catid})};
    })
    .value();

  const onSearch = val => {
    let searchRec = eventsList.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(val.toLowerCase())
      )
    );
    setState({...state, search: val, searchResult: searchRec});
  };
  const onChange = e => {
    if (e.target.value === '' || e.target.value === null) {
      setState({...state, search: null, searchResult: []});
    } else {
      setState({...state, search: null, searchResult: []});
    }
  };
  const getEvents = (id, tableView, setTableView) => {
    let dataSource = id ? _.filter(eventsList, {catid: id}) : eventsList;
    if (state.searchResult.length > 0) {
      dataSource = state.searchResult;
    }

    return (
      <>
        <div
          style={{
            height: '30px',
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyItems: 'end',
            alignItems: 'end',
        }}
        >
          {' '}
          <Switch
            style={{position: 'absolute', right: '0px', marginBottom: '20px'}}
            checkedChildren="Switch View"
            unCheckedChildren="Switch View"
            title="Switch View"
            onChange={e => {
              setTableView(e);
            }}
            defaultChecked={tableView}
          />
        </div>
        {tableView ? (
          <Table bordered dataSource={dataSource} columns={columns} />
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            className="ant_listing_box"
            dataSource={dataSource}
            pagination={{pageSize: 9, showQuickJumper: true}}
            renderItem={item => {
              let htmlString = item.event_desc || '';
              var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
              return (
                <div className="listing">
                  <Link to={`/listing/${item.eventid}`}>
                    <Card Bordered>
                      <div className="EventImg">
                        <div
                          className={`img ${
                            item.gallery == null ? 'blankImg' : ''
                          }`}
                          style={{backgroundImage: `url(${item.gallery})`}}
                        ></div>
                        <p className="category">
                          <Tag icon={<FormOutlined />} color="#55acee">
                            {item.category.name}
                          </Tag>
                        </p>
                      </div>
                      <div className="details">
                        <p className="title">{item.event_name}</p>
                        <p
                          dangerouslySetInnerHTML={{__html: stripedHtml}}
                          className="desc"
                        />
                        <Divider />
                        <div className="info">
                          <p className="key">
                            <ClockCircleOutlined /> <strong>Event Date</strong>
                          </p>
                          {moment(item.start_date, true).isValid() ? (
                            <>
                              <p className="value">
                                {moment(item.start_date).format('lll')} -{' '}
                                {moment(item.end_date).format('lll')}
                              </p>
                            </>
                          ) : (
                            <p className="value">Yet to announced</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            }}
          />
        )}
      </>
    );
  };

  const {TabPane} = Tabs;
  const {Search} = Input;
  const [tableView, setTableView] = useState(false);

  // console.log({ categoryList, eventsList })
  return (
    <>
      <Content className="homePage">
        <section style={{marginTop: 20}}>
          <h1>Our Events and Jobs Listings</h1>
        </section>
        <div className="web_home_view">
          {!state.isLoading ? (
            <section>
              <Tabs
                defaultActiveKey={0}
                tabBarExtraContent={
                  <Search
                    onChange={onChange}
                    onSearch={onSearch}
                    placeholder="Search"
                    allowClear
                    enterButton="Search"
                    size="large"
                  />
                }
              >
                <TabPane tab="All" key={0}>
                  {getEvents(undefined, tableView, setTableView)}
                </TabPane>
                {categoryList.map((rec, indx) => (
                  <TabPane  tab={rec.name} key={rec.id + 1}>
                    {getEvents(rec.id, tableView, setTableView)}
                  </TabPane>
                ))}
              </Tabs>
            </section>
          ) : null}
        </div>
        <div className="mobile_home_view">
          {!state.isLoading ? (
            <div className="event_list_card">
              {eventsList.map(item => {
                let htmlString = item.event_desc || '';
                var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
                return (
                  <div className="listing">
                    <Link to={`/listing/${item.eventid}`}>
                      <Card Bordered>
                        <div className="EventImg">
                          <div
                            className={`img ${
                              item.gallery == null ? 'blankImg' : ''
                            }`}
                            style={{backgroundImage: `url(${item.gallery})`}}
                          ></div>
                          <p className="category">
                            <Tag icon={<FormOutlined />} color="#55acee">
                              {item.category.name}
                            </Tag>
                          </p>
                        </div>
                        <div className="details">
                          <p className="title">{item.event_name}</p>
                          <p
                            dangerouslySetInnerHTML={{__html: stripedHtml}}
                            className="desc"
                          />
                          <Divider />
                          <div className="info">
                            <p className="key">
                              <ClockCircleOutlined />{' '}
                              <strong>Event Date</strong>
                            </p>
                            {moment(item.start_date, true).isValid() ? (
                              <>
                                <p className="value">
                                  {moment(item.start_date).format('lll')} -{' '}
                                  {moment(item.end_date).format('lll')}
                                </p>
                              </>
                            ) : (
                              <p className="value">Yet to announced</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </Content>
    </>
  );
};
export default Index;
