import { nguoiDungMau } from '../data/nguoiDung';
import { troChuyenMau } from '../data/troChuyen';
import { tinNhanMau } from '../data/tinNhan';
import { thongBaoMau } from '../data/thongBao';
import type { TaiKhoan, TinNhan, TrangThaiChat } from '../types';

export type ChatAction =
  | { type: 'DANG_NHAP'; taiKhoan: TaiKhoan }
  | { type: 'DANG_XUAT' }
  | { type: 'MO_CHAT'; nguoiDungId: string }
  | { type: 'DOC_CHAT'; troChuyenId: string }
  | { type: 'GUI_TIN'; tinNhan: TinNhan }
  | { type: 'DOC_THONG_BAO'; id: string }
  | { type: 'DOC_TAT_CA_THONG_BAO' }
  | { type: 'DOI_ONLINE'; value: boolean }
  | { type: 'DOI_BADGE'; value: boolean };

export const taoTrangThaiBanDau = (): TrangThaiChat => ({
  taiKhoan: null,
  nguoiDung: nguoiDungMau.map(item => ({ ...item })),
  troChuyen: troChuyenMau.map(item => ({ ...item })),
  tinNhan: Object.fromEntries(
    Object.entries(tinNhanMau).map(([id, items]) => [
      id,
      items.map(item => ({ ...item })),
    ]),
  ),
  thongBao: thongBaoMau.map(item => ({ ...item })),
  hienThiOnline: true,
  hienThiBadge: true,
});

export const chatReducer = (
  state: TrangThaiChat,
  action: ChatAction,
): TrangThaiChat => {
  switch (action.type) {
    case 'DANG_NHAP':
      return { ...state, taiKhoan: action.taiKhoan };
    case 'DANG_XUAT':
      return taoTrangThaiBanDau();
    case 'MO_CHAT': {
      const existing = state.troChuyen.find(
        item => item.nguoiDungId === action.nguoiDungId,
      );
      if (!state.nguoiDung.some(user => user.id === action.nguoiDungId))
        return state;
      if (existing)
        return {
          ...state,
          troChuyen: state.troChuyen.map(item =>
            item.id === existing.id ? { ...item, soChuaDoc: 0 } : item,
          ),
        };
      const id = `chat-${action.nguoiDungId}`;
      return {
        ...state,
        troChuyen: [
          { id, nguoiDungId: action.nguoiDungId, soChuaDoc: 0 },
          ...state.troChuyen,
        ],
        tinNhan: { ...state.tinNhan, [id]: [] },
      };
    }
    case 'DOC_CHAT':
      return {
        ...state,
        troChuyen: state.troChuyen.map(item =>
          item.id === action.troChuyenId ? { ...item, soChuaDoc: 0 } : item,
        ),
      };
    case 'GUI_TIN': {
      if (
        !state.taiKhoan ||
        !state.troChuyen.some(item => item.id === action.tinNhan.troChuyenId) ||
        !action.tinNhan.noiDung.trim()
      )
        return state;
      const message = {
        ...action.tinNhan,
        noiDung: action.tinNhan.noiDung.trim(),
      };
      const conversation = state.troChuyen.find(
        item => item.id === message.troChuyenId,
      )!;
      return {
        ...state,
        troChuyen: [
          conversation,
          ...state.troChuyen.filter(item => item.id !== conversation.id),
        ],
        tinNhan: {
          ...state.tinNhan,
          [message.troChuyenId]: [
            ...(state.tinNhan[message.troChuyenId] || []),
            message,
          ],
        },
      };
    }
    case 'DOC_THONG_BAO':
      return {
        ...state,
        thongBao: state.thongBao.map(item =>
          item.id === action.id ? { ...item, daDoc: true } : item,
        ),
      };
    case 'DOC_TAT_CA_THONG_BAO':
      return {
        ...state,
        thongBao: state.thongBao.map(item => ({ ...item, daDoc: true })),
      };
    case 'DOI_ONLINE':
      return { ...state, hienThiOnline: action.value };
    case 'DOI_BADGE':
      return { ...state, hienThiBadge: action.value };
    default:
      return state;
  }
};
