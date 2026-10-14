import type { TinNhan } from '../types';
const luc = (gio: number, phut: number, ngay = 14) =>
  new Date(2026, 9, ngay, gio, phut).getTime();
export const tinNhanMau: Record<string, TinNhan[]> = {
  'chat-an': [
    {
      id: 'an-1',
      troChuyenId: 'chat-an',
      nguoiGuiId: 'an',
      noiDung: 'Chiều nay mình cùng làm bài thực hành nhé?',
      thoiGian: luc(9, 30),
    },
    {
      id: 'an-2',
      troChuyenId: 'chat-an',
      nguoiGuiId: 'me',
      noiDung: 'Được nha, mình chuẩn bị tài liệu rồi.',
      thoiGian: luc(9, 32),
    },
    {
      id: 'an-3',
      troChuyenId: 'chat-an',
      nguoiGuiId: 'an',
      noiDung: 'Mình gửi tài liệu rồi nhé!',
      thoiGian: luc(9, 38),
    },
  ],
  'chat-anh': [
    {
      id: 'anh-1',
      troChuyenId: 'chat-anh',
      nguoiGuiId: 'me',
      noiDung: 'Bạn đang ở đâu vậy?',
      thoiGian: luc(9, 18),
    },
    {
      id: 'anh-2',
      troChuyenId: 'chat-anh',
      nguoiGuiId: 'anh',
      noiDung: 'Chiều nay gặp ở thư viện nha.',
      thoiGian: luc(9, 20),
    },
  ],
  'chat-group': [
    {
      id: 'group-1',
      troChuyenId: 'chat-group',
      nguoiGuiId: 'an',
      noiDung: 'Mọi người đã xem yêu cầu bài chat chưa?',
      thoiGian: luc(8, 40),
    },
    {
      id: 'group-2',
      troChuyenId: 'chat-group',
      nguoiGuiId: 'me',
      noiDung: 'Mình đang chuẩn bị giao diện rồi.',
      thoiGian: luc(8, 42),
    },
    {
      id: 'group-3',
      troChuyenId: 'chat-group',
      nguoiGuiId: 'binh',
      noiDung: 'Mai nộp bài thực hành nhé.',
      thoiGian: luc(8, 45),
    },
  ],
  'chat-binh': [
    {
      id: 'binh-1',
      troChuyenId: 'chat-binh',
      nguoiGuiId: 'binh',
      noiDung: 'Ngày mai cùng lên lớp nhé!',
      thoiGian: luc(17, 10, 13),
    },
    {
      id: 'binh-2',
      troChuyenId: 'chat-binh',
      nguoiGuiId: 'me',
      noiDung: 'Oke, hẹn gặp bạn!',
      thoiGian: luc(17, 12, 13),
    },
  ],
};
