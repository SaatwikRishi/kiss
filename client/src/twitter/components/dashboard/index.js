import React, { useEffect, memo, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  navigate } from '@reach/router';
import { Tabs, Progress, Button, Image, Tooltip, List, Tag, Dropdown, Menu, notification } from 'antd';
const { TabPane } = Tabs;
import { ArrowRightOutlined, AimOutlined, UserOutlined, HeartOutlined, MessageOutlined, SettingOutlined, TwitterOutlined,TagsOutlined, SafetyCertificateTwoTone, UserAddOutlined, UsergroupAddOutlined,GlobalOutlined, FieldTimeOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');
import axios from 'axios';

import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import mapShape from './mapShape';
import  {updateEvent} from '../../store/actions'
import { CommonDatePicker, CommonChatDrawer,  RefreshTweeets } from "../../layout/filters";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}


const Dashboard = memo((props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);
    const date = dashboardData.date;
    const country = dashboardData.country;
    const mountTime= moment();
    
    /**
     * Same day or not
     */
    const [sameDay, setsameDay] = useState(false);
    useEffect(() => {
        moment().isSame(date, 'day') ? setsameDay(true) : setsameDay(false);
    },[date]);
    useEffect(() => {
        return () => {
            const unMountTime = moment()
            var ms = moment(unMountTime).diff(moment(mountTime));
            var duration = moment.duration(ms);
            dispatch(updateEvent({
                page_name:'Dashboard',
                duration:duration.seconds()
            }))
        };
    },[]);

    /**
     * get data from Store
     */
    const getStoreData = () =>{
        let dashboard = dashboardData[date] ? dashboardData[date]: {};
        dashboard = dashboard[country] ? dashboard[country] : {};
        
        let allTweets = dashboard.allTweets ? dashboard.allTweets : {};
        let langData = dashboard.langData ? dashboard.langData : {};
        let countryData = dashboard.countryData ? dashboard.countryData : {};
        let categoryData = dashboard.categoryData ? dashboard.categoryData : {};
        let trendingData = dashboard.trendingData ? dashboard.trendingData : {};
        return {

            allTweets: { loading: true, data: [], base: [], ...allTweets},
            langData: { loading: true, data: [], ...langData },
            countryData: { loading: true, data: [], ...countryData},
            categoryData: { loading: true, data: [], ...categoryData},
            trendingData: { loading: true, data: [], ...trendingData },
        }
    }
    let data = getStoreData();

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Dashboard </div>
                <div className="_subTitle">Complaints  Twitter Dashboard</div>
            </div>
            <div className="filters">
                <CommonDatePicker />
                <RefreshTweeets />
            </div>
        </div>

        <div className="grid2" >
            <div className="trending card_box_round">
                <div class="card_card_box_title"> <AimOutlined className="title_icon" /> Top Customer Intents </div>
                <div className="centerbox mt20">
                    <CategoryChart allTweets={data.allTweets.data} data={data.categoryData.data} loading={data.categoryData.loading} />
                </div>
                <div className="card_card_box_link" onClick={() => navigate('/intent')} >
                    View all details <ArrowRightOutlined />
                </div>
            </div>
            <div className="grid2" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
                <div className="trending card_box_round">
                    <div class="card_card_box_title"> <UsergroupAddOutlined className="title_icon" /> Tweets by Most Followed Profiles </div>
                    <div className="centerbox mt20">
                        <TopUsers data={data.allTweets.data} />
                    </div>
                    <div className="card_card_box_link" onClick={() => navigate('/followers')} >
                        View all details <ArrowRightOutlined />
                    </div>
                </div>
                <div className="trending card_box_round">
                    <div class="card_card_box_title"> <GlobalOutlined className="title_icon" /> TWEETS PROFILE - LANGUAGE</div>
                    <div className="centerbox mt20">
                        <TopLanguage allTweets={data.allTweets.data} data={data.langData.data} loading={data.langData.loading} />
                    </div>
                    <div className="card_card_box_link" onClick={() => navigate('/language')} >
                        View all details <ArrowRightOutlined />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid2 mt20">
            <div className="card_box_round">
                <div class="card_card_box_title" style={{ paddingBottom: 20 }}><FieldTimeOutlined className="title_icon" /> Tweets against Paypal - Last {sameDay ? `24hr's`: ''}  </div>
                <TrendStatistic data={data.trendingData.data} />
                <div className="centerbox mt20" style={{ width: '100%', margin: '0 auto' }}>
                    <TrendingChart allTweets={data.allTweets.data} data={data.trendingData.data} loading={data.trendingData.loading} />
                </div>
            </div>
            <div className="country card_box_round">
                <div class="card_card_box_title"><GlobalOutlined className="title_icon" /> Twitter Profile -  Countries </div>
                <div class="country_status_bar">
                    <div class="_country">
                        <CountryMap allTweets={data.allTweets.data} data={data.countryData.data} loading={data.countryData.loading} />
                    </div>
                    <div class="_status_bar">
                        <TopFiveCountrys allTweets={data.allTweets.data} data={data.countryData.data} loading={data.countryData.loading} />
                    </div>
                </div>
                <div className="card_card_box_link" onClick={() => navigate('/country')} >
                    View all details <ArrowRightOutlined />
                </div>
            </div>
        </div>
        
        <div className="card_box_round mt20">
            <Tabs className="CustomTab">
                <TabPane key="1" tab="ALL TWEETS">
                    {(()=>{
                        let _chatData = _(data.allTweets.data).orderBy('event_date').reverse().value()
                        return <TweetsChat data={_chatData} />
                    })()}
                </TabPane>
                <TabPane key="2" tab="TWEETS BY COMMENTS">
                    {(()=>{
                        let temp = _(data.allTweets.data).orderBy('commentsCount').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
                <TabPane key="3" tab="TOP RETWEETS">
                    {(()=>{
                        let temp = _(data.allTweets.data).orderBy('retweet_count').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
                <TabPane key="4" tab="TWEETS BY FOLLOWED">
                    {(()=>{
                        let temp = _(data.allTweets.data).orderBy('followers_count').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
            </Tabs>
        </div>

    </>
})
export default Dashboard;


export const TweetsChat = ({data}) =>{
    let tweetsData = data;
    const [size, setsize] = useState(20)
    return <>
        <List
            itemLayout="vertical"
            className="ListTweets"
            size="small"
            pagination={{
                onChange: (page, index) => {
                    setsize(index);
                },
                pageSize: size,
            }}
            dataSource={tweetsData}
            renderItem={val => <div key={val.id_str} className="tweets_box">
                <div className="tweets_header">
                    <div className="tweets_user_img"><Image src={val.profile_image_url && val.profile_image_url.replace("normal", "400x400")} /></div>
                    <div className="tweets_user_details">
                        <div className="tweets_user_name">{decodeURIComponent(val.name)} <span className="tweets_screen_name">@{decodeURIComponent(val.screen_name)}</span></div>
                        <div className="tweets_user_folow small_br">Followers: <span className="subw400"> {helpNumberFormat(val.followers_count)}</span></div>
                        {val.friends_count ? <div className="tweets_user_folow small_br">Following: <span className="subw400"> {helpNumberFormat(val.friends_count)}</span></div> : null}
                        {val.intent ? <div className="tweets_user_country small_br" style={{fontWeight:'bolder',color:'#1890ff'}}><u><strong>Intent: <span   className="subw400" style={{fontWeight:'bolder',color:'#1890ff'}}> {helpNumberFormat(val.intent)}</span></strong></u></div> : null}
                        {val.country ? <div className="tweets_user_country small_br">Country: <span className="subw400"> {helpNumberFormat(val.country)}</span></div> : null}
                        <div className="tweets_user_date small_br">Date: <span className="subw400"> 
                        {moment(val.event_ts * 1000).format('LLL')} &nbsp;<Tag>{moment(val.event_date).fromNow()}
                        </Tag></span></div>
                    </div>
                </div>
                <div className="tweets_body">
                    <div className="tweets_text">
                        
                        {decodeURIComponent(val.text)}
                        {(val.lang != 'en' && val.lang != 'und' && val.lang != 'null' && val.translated) && <div className="tweets_lng_translate">
                            <div className="lang_title">Translated from  <Tag color="red"> {val.lang} to EN</Tag></div>
                            {decodeURIComponent(val.translated)}
                        </div>}

                        <div className="tags_and_other_details">
                            <ul>
                                {val.user_mentions.length ? <li>
                                    <div className="_tag">
                                        {val.user_mentions.map(val=> <a href={`https://twitter.com/${val}/`} target="_blank"><Tag><TagsOutlined /> {val}</Tag></a> )}
                                    </div>
                                </li>: null}
                            </ul>
                        </div>

                        <Image.PreviewGroup>
                            <div className="tweets_img_boxes">
                                {val.attachments && _.uniq(val.attachments).map(val => <div className="_box">
                                    <Image src={val && val.replace("normal", "400x400")} />
                                </div>)}
                            </div>
                        </Image.PreviewGroup>
                    </div>
                    <CommentsChart {...{val}} />
                </div>
            </div>}
        />
    </>
}
const CommentsChart = ({val}) =>{
    const [visible, setvisible] = useState(false);

    const restrictTweet = (type, value) =>{
        axios.post(`/twitter/api/restrictTweet`, { type, data: value }).then(res=>{
            console.log(res);
            notification.success({ description: `${type} Restricted Successfully !`});
        })
    }
    return <>
        <div className="action_box">
            <Tooltip placement="top" title={`Comments`}>
                <div onClick={() => setvisible(!visible)} className="_action">
                    <MessageOutlined twoToneColor="#52c41a" /> {val.commentsCount}
                </div>
            </Tooltip>
            <Tooltip placement="top" title={`Favourites`}>
                <div className="_action">
                    <HeartOutlined  /> {val.favourites_count ? helpNumberFormat(val.favourites_count): 0}
                </div>
            </Tooltip>
            <Tooltip placement="top" title={`ReTweets`}>
                <div className="_action">
                    <TwitterOutlined /> {val.retweet_count ? helpNumberFormat(val.retweet_count): 0}
                </div>
            </Tooltip>

            <Tooltip placement="top" title={`Go to Twitter`}>
                <div className="_action">
                    <a style={{fontSize:18}} target="_blank" href={`https://twitter.com/${val.screen_name}/status/${val.id_str}`}><Tag icon={<TwitterOutlined />} color="#55acee">Twitter</Tag> </a>
                </div>
            </Tooltip>
            <div className="_action">
                <Dropdown overlay={<Menu>
                    <Menu.Item>
                        <div className="block_usr_action" onClick={()=> restrictTweet('User', val)}><UserOutlined /> Restrict user</div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className="block_usr_action" onClick={()=> restrictTweet('Tweet', val)}><TwitterOutlined />Restrict tweets</div>
                    </Menu.Item>
                </Menu>} placement="bottomCenter">
                    <Button size="small" shape="circle" type="primary" icon={<SettingOutlined />}></Button>
                </Dropdown>
            </div>
        </div>
        {val.commentsCount && visible ? <div className="tweets_comments"> <TweetsChat data={val.comments} /> </div> : null}
    </>
}

/**
 * Top User Infomation
 */
export const TopUsers = memo(({data}) =>{

    let userData = _(data).groupBy('screen_name').map((val, key) => {
        return {
            count: val.length,
            name: decodeURIComponent(val[0].name),
            screen_name: decodeURIComponent(val[0].screen_name),
            followers_count: val[0].followers_count,
            retweet_count: val[0].retweet_count
        }
    }).uniqBy('screen_name').take(7).orderBy('followers_count').reverse().value();

    /**
     * on Click User Profile
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (screen_name) => {
        settweets({ title: screen_name, data: _(data).filter(val => val.screen_name == screen_name).value() });
        setvisible(true);
    }

    return <>
        <div class="detail_list">
            <div class="details _header">
                <div class="_title touppCaseTitle">User ID</div>
                <div class="_folow touppCaseTitle textRight">Followers</div>
                <div class="_folow touppCaseTitle textRight">Tweets</div>
            </div>
            {userData.map(val=><>
                <div class="details" onClick={() => onClickPoint(val.screen_name)}>
                    <div class="_title">{val.screen_name}</div>
                    <div class="_count">{helpNumberFormat(val.followers_count)}</div>
                    <div class="_count">{helpNumberFormat(val.count)}</div>
                </div>
                <Progress percent={val.count} size="small" />
            </>)}
        </div>
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `User ID : ${tweets.title}` }} />}
    </>
})

/**
 * Top Lang Infomation
 */
export const TopLanguage = memo(({ allTweets= [], data=[], loading}) =>{
    let userData = _(data).map(val => ({ name: val.name, sum: val.sum, sumAvg: val.sumAvg })).filter(val => val.name != 'und').take(7).value();
    let todayTotal = _.sumBy(data, 'sum');

    /**
     * on Click Language
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (lang) => {
        settweets({ title: lang, data: _(allTweets).filter(val => val.lang == lang).value() });
        setvisible(true);
    }

    return <>
        <div class="detail_list">
            <div class="details _header">
                <div class="_title touppCaseTitle">Language</div>
                <div class="_folow touppCaseTitle textRight">4W Average</div>
                <div class="_folow touppCaseTitle textRight">Today</div>
            </div>
            {userData.map(val => <>
                <div class="details" onClick={() => onClickPoint(val.name)}>
                    <div class="_title">{val.name}</div>
                    <div class="_count">{helpNumberFormat(val.sumAvg)}</div>
                    <div class="_count">{helpNumberFormat(val.sum)}</div>
                </div>
                <Progress percent={val.sum / todayTotal * 100 } size="small" />
            </>)}
        </div>
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `Language : ${tweets.title}` }} />}
    </>
})

/**
 * Top 5 Category Bar charts
 */
export const CategoryChart = memo(({ allTweets=[], data =[], loading}) =>{


    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({title: '', data:[]});
    const onClickPoint = (e) =>{
        settweets({ title: e.category, data: _(allTweets).filter(val => val.intent == e.category ).value()});
        setvisible(true);
    }

    let config = {
        chart: {
            type: 'column',
            height: 320,
            zoomType: 'x',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        colors: ['#2d6ccd', '#c2bfbc', '#ef6262'],
        legend: {
            padding: 0,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            itemStyle: {
                fontSize: '10px',
                textTransform: 'uppercase'
            },
            enabled: true
        },
        yAxis: {
            gridLineColor: '#f0f0f0',
            gridLineDashStyle: 'dash',
            lineWidth: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: true,
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                // stacking: 'normal',
                borderRadius: 2,
                fillOpacity: 0.5,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            onClickPoint(this)
                        }
                    }
                }
            },
        },
        xAxis: {
            categories: _(data).map(val=> val.name).value(),
            // crosshair: true,
            labels:{
                enabled: true
            }
        },
        series: [
            {
                name: 'Today',
                color: '#2d6ccd',
                marker: { lineColor: '#2d6ccd' },
                data: _(data).map(val=> val.sum).value()
            },
            {
                name: '4W Average',
                color: '#c2bfbc',
                marker: { lineColor: '#c2bfbc' },
                data: _(data).map(val=> val.sumAvg).value()
            },
        ],
    }

    return <>
        <ReactHighcharts config={config} />
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `Intents : ${tweets.title}`}} />}
    </>
})

/**
 * Trending Bar based on 15min time series
 */
export const TrendingChart = memo(({ allTweets=[], data=[], loading, height = 350 }) => {

    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({title: '', data:[]});
    // console.log(allTweets);

    const onClickPoint = (e) =>{
        if (e.max && e.min){
            let startIndex = e.min;
            let endIndex = e.max;
            
            let selectedArea = _.filter(allTweets, (val) => {
                return val.event_ts>= (startIndex / 1000) && val.event_ts <= (endIndex / 1000);
            });

            let GetTitle = `TimeRage From : ${moment(startIndex).format('LT')} - To: ${moment(endIndex).format('LT')}`
            settweets({ title: GetTitle, data: selectedArea });
            setvisible(true);
        }
    }

    let trendData = data.length ? data[0]: data;
    let config = {
        chart: {
            height: height,
            zoomType: 'x',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        colors: ['#2d6ccd', '#0f8d34', '#ef6262'],
        legend: {
            padding: 0,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            itemStyle: {
                fontSize: '10px',
                textTransform: 'uppercase'
            },
            enabled: true
        },
        yAxis: {
            gridLineColor: '#f0f0f0',
            gridLineDashStyle: 'dash',
            lineWidth: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: true
            }
        },
        plotOptions: {
            series: {
                borderRadius: 1,
                fillOpacity: 0.3,
                cursor: 'pointer',
                marker: {
                    enabled: false
                },
                point: {
                    events: {
                        click:onClickPoint
                    }
                }
            },
            "area": {
                "lineWidth": 1,
                "marker": {
                    "lineWidth": 0,
                    "symbol": "circle",
                    "fillColor": "white",
                    "radius": 0
                }
            },
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 1
            }
        },
        tooltip: {
            shared: true
        },
        time: {
            timezone: 'America/Los_Angeles'
        },
        xAxis: {
            crosshair: true,
            labels: {
                enabled: true,
            },
            tickInterval: 6,
            // tickInterval: 1000 * 60 * 60 * 24 * 365,
            rangeSelector: {
                selected: 1,
                inputDateFormat: '%Y-%d-%m',
                inputEditDateFormat: '%Y-%d-%m'
            },
            events: {
	    		setExtremes: onClickPoint
	    	},
            type: "datetime",
            labels: {
                format: '{value:%l:%M %p}'
            },
        },
        series: [{
            name:'Today',
            type: "area",
            color: '#2d6ccd',
            marker: { lineColor: '#2d6ccd' },
            fillOpacity: 0.8,
            data: _(trendData.data || []).filter(val => val.epoch).orderBy('epoch').map(val => [val.epoch, val.sum]).value()
        },
        {
            name: '4W Average',
            type: "line",
            color: '#4b4a4a',
            marker: { lineColor: '#4b4a4a'},
            dashStyle: 'ShortDash',
            fillOpacity: 0.8,
            data: _(trendData.data || []).filter(val => val.epoch).orderBy('epoch').map(val => [val.epoch, val.sumAvg]).value()
        }
        ],
    }

    return <>
        <ReactHighcharts config={config} />
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `Country : ${tweets.title}` }} />}
    </>
})

/**
 * Top 5 Country and Count
 */
export const TopFiveCountrys = memo(({allTweets= [], data=[], base}) =>{
    let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

    let topFiveCountry = _(data).map(val => ({ sum: val.sum, val, sumAvg: val.sumAvg, name: val.name })).filter(val=> val.name!='null').take(6).value();
    let todayTotal = _.sumBy(data, 'sum');

    /**
     * on Click Country
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (country_code) => {
        settweets({ 
            title: (() => { try { return regionNamesInEnglish.of(country_code) } catch (r) { return country_code } })(), 
            data: _(allTweets).filter(val => val.country_code == country_code).value() 
        });
        setvisible(true);
    }

    return <>
            <div class="_header">
                <div class="_left">COUNTRY</div>
                <div class="_right">TWEETS</div>
            </div>
            <ul>
                {topFiveCountry.map((val, index) => <li onClick={() => onClickPoint(val.name)}>
                    <div class="_status">
                        <div class="_left">
                            {
                                (() => {
                                    try { return regionNamesInEnglish.of(val.name) } catch (r) { return val.name }
                                })()
                            }
                        </div>
                        <div class="_right">
                            <span>{helpNumberFormat(val.sum)}</span>
                        </div>
                    </div>
                    <Tooltip placement="top" title={`Today: ${helpNumberFormat(val.sum)}, 4W Avg: ${helpNumberFormat(val.sumAvg)}`}>
                        <Progress percent={val.sum / todayTotal * 100} size="small" />
                        <Progress className="grey_color_progress" percent={val.sumAvg / todayTotal * 100} size="small" />
                    </Tooltip>
                </li>)}
            </ul>
            {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `Country : ${tweets.title}` }} />}
    </>
})

/**
 * Country Higharts map
 * id, value
 */
export const CountryMap = memo(({ allTweets= [], data =[], loading }) => {
    let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

    /**
     * on Click Country
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (e) => {
        settweets({
            title: (() => { try { return regionNamesInEnglish.of(e.id) } catch (r) { return e.id } })(),
            data: _(allTweets).filter(val => val.country_code == e.id).value()
        });
        setvisible(true);
    }

    let config = {
        chart: {
            map: 'custom/world',
            height: 320,
        },
        title: {
            "text": ''
        },
        colorAxis: {
            min: 1,
            max: 100,
            minColor: '#689cf0',
            maxColor: '#174ea6',
            lineColor: 'green',
        },
        series: [{
            data: _(data).map(val => ({ id: val.name, value: val.sum })).value(),
            mapData: mapShape,
            nullColor: '#f5f5f5',
            joinBy: ['iso-a2', 'id'],
            name: 'Tweets',
            point: {},

            cursor: 'pointer',
            allowPointSelect: true,
            states: {
                hover: {
                    color: '#0e457d'
                },
                select: {
                    color: '#EFFFEF',
                    borderColor: 'black',
                    dashStyle: 'dot'
                }
            },
            point: {
                events: {
                    click: function (e) {
                        onClickPoint(this);
                    }
                }
            }
        }],
        navigation: {
            buttonOptions: {
                align: 'center'
            }
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: false,
            enableMouseWheelZoom: false,
            enableDoubleClickZoomTo: false,
        },
    }

    return <>
        <ReactHighmaps config={config} />
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `Country : ${tweets.title}` }} />}
    </>
})

/**
 * Tredn Statistic
 */
export const TrendStatistic= memo(({data}) =>{
    let statisticsData = data.length ? data[0] : { sum: 0, sumAvg:0 };
    return <>
        <div className="trending_details">
            <div className="today-tweets">
                <div className="_title">Tweets</div>
                <div className="_value"><UserAddOutlined /> {helpNumberFormat(statisticsData.sum)} </div>
            </div>
            <div className="today-tweets">
                <div className="_title">4W Avg</div>
                <div className="_value"><UsergroupAddOutlined /> {helpNumberFormat(statisticsData.sumAvg)} </div>
            </div>
            <div className="today-tweets">
                <div className="_title">Difference</div>
                <div className="_value"><UsergroupAddOutlined /> {helpNumberFormat(statisticsData.sum - statisticsData.sumAvg)} </div>
            </div>
        </div>
    </>
})