import { avatars } from '../assets/avatars';
import type { NguoiDung } from '../types';

export const nguoiDungMau: NguoiDung[] = [
  {
    id: 'an',
    ten: 'Nguyễn An',
    tenNgan: 'An',
    avatar: avatars.an,
    online: true,
  },
  {
    id: 'anh',
    ten: 'Minh Anh',
    tenNgan: 'Anh',
    avatar: avatars.anh,
    online: true,
  },
  {
    id: 'group',
    ten: 'Nhóm lớp CNTT',
    tenNgan: 'Nhóm lớp',
    avatar: avatars.group,
    online: false,
    laNhom: true,
  },
  {
    id: 'binh',
    ten: 'Trần Bình',
    tenNgan: 'Bình',
    avatar: avatars.binh,
    online: false,
  },
  {
    id: 'linh',
    ten: 'Hoàng Linh',
    tenNgan: 'Linh',
    avatar: avatars.linh,
    online: true,
  },
  {
    id: 'mai',
    ten: 'Thu Mai',
    tenNgan: 'Mai',
    avatar: avatars.mai,
    online: false,
  },
];
