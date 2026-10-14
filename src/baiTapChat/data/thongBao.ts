import type { ThongBao } from '../types';
export const thongBaoMau: ThongBao[] = [
  {
    id: 'n1',
    tieuDe: 'Bạn có tin nhắn mới',
    noiDung: 'Nguyễn An đã gửi tài liệu cho bạn.',
    thoiGian: '3 phút trước',
    daDoc: false,
    loai: 'tinNhan',
  },
  {
    id: 'n2',
    tieuDe: 'Lời nhắc từ nhóm lớp',
    noiDung: 'Đừng quên nộp bài thực hành ngày mai.',
    thoiGian: '1 giờ trước',
    daDoc: false,
    loai: 'nhom',
  },
  {
    id: 'n3',
    tieuDe: 'Chào mừng đến UDU Chat',
    noiDung: 'Bắt đầu kết nối với bạn bè trong lớp.',
    thoiGian: 'Hôm qua',
    daDoc: true,
    loai: 'heThong',
  },
];
