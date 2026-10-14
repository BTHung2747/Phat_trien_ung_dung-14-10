import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  type PropsWithChildren,
} from 'react';
import { avatars } from '../assets/avatars';
import type { TrangThaiChat } from '../types';
import { kiemTraDangNhap } from '../utils/dangNhap';
import { chatReducer, taoTrangThaiBanDau } from './chatReducer';

interface ChatContextValue extends TrangThaiChat {
  dangNhap: (taiKhoan: string, matKhau: string) => boolean;
  dangXuat: () => void;
  moChat: (nguoiDungId: string) => string;
  docChat: (troChuyenId: string) => void;
  guiTin: (troChuyenId: string, noiDung: string) => boolean;
  docThongBao: (id: string) => void;
  docTatCaThongBao: () => void;
  doiOnline: (value: boolean) => void;
  doiBadge: (value: boolean) => void;
  moDuAnCu?: () => void;
}
const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({
  children,
  moDuAnCu,
}: PropsWithChildren<{ moDuAnCu?: () => void }>) => {
  const [state, dispatch] = useReducer(
    chatReducer,
    undefined,
    taoTrangThaiBanDau,
  );
  const sequence = useRef(0);
  const value: ChatContextValue = {
    ...state,
    moDuAnCu,
    dangNhap: (taiKhoan, matKhau) => {
      const errors = kiemTraDangNhap(taiKhoan, matKhau);
      if (errors.taiKhoan || errors.matKhau) return false;
      const username = taiKhoan.trim();
      dispatch({
        type: 'DANG_NHAP',
        taiKhoan: {
          taiKhoan: username,
          tenHienThi: ['hung', 'hung.b23dcc079'].includes(
            username.toLowerCase(),
          )
            ? 'Bùi Tuấn Hưng'
            : username,
          avatar: avatars.me,
        },
      });
      return true;
    },
    dangXuat: () => dispatch({ type: 'DANG_XUAT' }),
    moChat: nguoiDungId => {
      const id =
        state.troChuyen.find(item => item.nguoiDungId === nguoiDungId)?.id ||
        `chat-${nguoiDungId}`;
      dispatch({ type: 'MO_CHAT', nguoiDungId });
      return id;
    },
    docChat: troChuyenId => dispatch({ type: 'DOC_CHAT', troChuyenId }),
    guiTin: (troChuyenId, noiDung) => {
      if (
        !state.taiKhoan ||
        !noiDung.trim() ||
        !state.troChuyen.some(item => item.id === troChuyenId)
      )
        return false;
      sequence.current += 1;
      const now = Date.now();
      dispatch({
        type: 'GUI_TIN',
        tinNhan: {
          id: `me-${now}-${sequence.current}`,
          troChuyenId,
          nguoiGuiId: 'me',
          noiDung,
          thoiGian: now,
        },
      });
      return true;
    },
    docThongBao: id => dispatch({ type: 'DOC_THONG_BAO', id }),
    docTatCaThongBao: () => dispatch({ type: 'DOC_TAT_CA_THONG_BAO' }),
    doiOnline: online => dispatch({ type: 'DOI_ONLINE', value: online }),
    doiBadge: badge => dispatch({ type: 'DOI_BADGE', value: badge }),
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat phải được dùng trong ChatProvider.');
  return context;
};
