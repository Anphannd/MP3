import React, { memo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ZingChart.module.scss';
import imageChart from '../assets/img/view bien 6.jpg';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import icons from '../utils/Icons';
import { SongItem } from './';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import path from '../utils/path';

const cx = classNames.bind(styles);
const { IoIosPlay } = icons;

const ZingChart = () => {
    const [data, setData] = useState([]);
    const { rank, chart } = useSelector((state) => state.app);
    console.log({ rank, chart });
    const chartRef = useRef();
    const [tooltipls, setTooltipls] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });

    const [selected, setSelected] = useState(null);
    const options = {
        reponsive: true,
        pointRadius: 0,
        // acpectRatio: 4,
        maintainAcpectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { drawTicks: false, color: 'rgba(255, 255, 255, 0.1)' },
                border: { dash: [1, 4] },
                // min: chart?.minScore,
                // max: chart?.maxScore,
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: (context) => {
                    const tooltipModel = context.tooltip;
                    if (!chartRef || !chartRef.current) return;

                    if (tooltipModel.opacity === 0) {
                        if (tooltipls.opacity !== 0) setTooltipls((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            datas: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }

                    console.log(+tooltipModel.body[0]?.lines[0].replace('.', ''));
                    // so sánh giá trị lines với couter tìm giá trị chung
                    const compare = counters.find((item) =>
                        item.datas?.some((number) => number === +tooltipModel.body[0]?.lines[0].replace('.', '')),
                    );
                    setSelected(compare.encodeId);
                    // console.log(selected);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltipModel.caretX,
                        top: tooltipModel.caretY,
                    };
                    if (!_.isEqual(tooltipls, newTooltipData)) setTooltipls(newTooltipData);
                },
            },
        },
        // hover hiện con trỏ
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };

    // console.log(tooltipls);
    useEffect(() => {
        if (!chart || !chart.times || !chart.items) {
            console.log('Chart data is missing or invalid.');
            return;
        }

        let labels = chart?.times?.filter((item) => +item.hour % 2 === 0);
        if (Array.isArray(labels)) {
            labels = labels?.map((item) => `${item.hour}:00`);
        } else {
            labels = [];
        }

        const datasets = [];
        const colors = ['#4a90e2', ' #50e3c2', '#e35050'];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                let dataItem = chart?.items[Object.keys(chart?.items)[i]]?.filter((item) => +item.hour % 2 === 0);
                console.log(dataItem);
                if (Array.isArray(dataItem)) {
                    dataItem = dataItem?.map((item) => item.counter);
                } else {
                    dataItem = [];
                }
                datasets.push({
                    data: dataItem,
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    fill: false,
                    tension: 0.3,
                    borderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 3,
                    pointBackgroundColor: 'white',
                    // pointborderColor: colors[i],
                });
            }
        }
        // console.log(datasets);
        setData({ labels, datasets });
    }, [chart]);
    return (
        <div className={cx('zingchart')}>
            <img src={imageChart} alt="imageChart" className={cx('imageChart')} />
            <div className={cx('zingchart-gradien')}></div>
            <div className={cx('zingchart-m')}>
                <Link to={path.ZING_CHART_TO}>
                    <div className={cx('zingchart-header')}>
                        <h3>#zingchart</h3>
                        <span className={cx('zingChart-icon')}>
                            <IoIosPlay />
                        </span>
                    </div>
                </Link>
                <div className={cx('zingchart-content')}>
                    <div className={cx('zingchart-left')}>
                        {rank
                            ?.filter((item, index) => index < 3)
                            ?.map((item, index) => (
                                <SongItem
                                    key={item.encodeId}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artistsNames={item.artistsNames}
                                    oder={index + 1}
                                    percent={Math.floor((item.score * 100) / chart?.totalScore)}
                                    sid={item.encodeId}
                                />
                            ))}
                        <div className={cx('see-more')}>
                            <Link to={path.ZING_CHART_TO}>
                                <span className={cx('seeMore-btn')}>Xem thêm</span>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('zingchart-right')}>
                        {data?.labels?.length > 0 && data?.datasets?.length > 0 ? (
                            <Line data={data} options={options} ref={chartRef} />
                        ) : (
                            <p>No data available</p>
                        )}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipls.top,
                                left: tooltipls.left,
                                opacity: tooltipls.opacity,
                                position: 'absolute',
                            }}
                        >
                            <SongItem
                                thumbnail={rank?.find((item) => item.encodeId === selected)?.thumbnail}
                                title={rank?.find((item) => item.encodeId === selected)?.title}
                                artistsNames={rank?.find((item) => item.encodeId === selected)?.artistsNames}
                                sid={rank?.find((item) => item.encodeId === selected)?.encodeId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ZingChart);
