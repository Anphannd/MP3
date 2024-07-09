import icons from './Icons';
const { RiCompassDiscoverLine, MdLibraryMusic, SiGraylog, IoIosRadio } = icons;
const Menu = [
    {
        path: 'mymusic',
        title: 'Thư viện ',
        icon: <MdLibraryMusic size={24} />,
    },
    {
        path: '',
        title: 'Khám Phá ',
        icon: <RiCompassDiscoverLine size={24} />,
    },
    {
        path: 'zing-chart',
        title: '#zingchart ',
        icon: <SiGraylog size={24} />,
    },
    {
        path: 'radio',
        title: 'Radio ',
        icon: <IoIosRadio size={24} />,
    },
];
export { Menu };
const SearchMenu = [
    {
        path: 'tat-ca',
        title: 'TẤT CẢ ',
    },
    {
        path: 'bai-hat',
        title: 'BÀI HÁT ',
    },
    {
        path: 'playlist',
        title: 'PLAYLIST/ALBUM ',
    },
    {
        path: 'radio',
        title: 'NGHỆ SĨ/OA ',
    },
];
export { SearchMenu };
