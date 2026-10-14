import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ChatProvider, useChat } from '../src/baiTapChat/state/ChatContext';
import { khopTimKiem } from '../src/baiTapChat/utils/timKiem';

let tree: ReactTestRenderer.ReactTestRenderer | undefined;
let current: ReturnType<typeof useChat>;
const Capture = () => {
  current = useChat();
  return null;
};

beforeEach(async () => {
  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(
      <ChatProvider>
        <Capture />
      </ChatProvider>,
    );
  });
});
afterEach(async () => {
  await ReactTestRenderer.act(async () => {
    tree?.unmount();
  });
});

test('requires both login fields and rejects sending before a session exists', async () => {
  let accepted = true;
  await ReactTestRenderer.act(async () => {
    accepted = current.dangNhap('  ', 'pass');
  });
  expect(accepted).toBe(false);
  await ReactTestRenderer.act(async () => {
    accepted = current.dangNhap('hung', '  ');
  });
  expect(accepted).toBe(false);
  expect(current.taiKhoan).toBeNull();
  expect(current.guiTin('chat-an', 'Xin chào')).toBe(false);
  await ReactTestRenderer.act(async () => {
    accepted = current.dangNhap('  hung  ', 'pass');
  });
  expect(accepted).toBe(true);
  expect(current.taiKhoan?.taiKhoan).toBe('hung');
  expect(current.taiKhoan?.tenHienThi).toBe('Bùi Tuấn Hưng');
});

test('opens the same chat from contacts, clears unread and sends a trimmed local message', async () => {
  await ReactTestRenderer.act(async () => {
    current.dangNhap('hung', 'pass');
  });
  let existingId = '';
  await ReactTestRenderer.act(async () => {
    existingId = current.moChat('an');
  });
  expect(existingId).toBe('chat-an');
  expect(
    current.troChuyen.find(item => item.id === existingId)?.soChuaDoc,
  ).toBe(0);
  expect(
    current.troChuyen.find(item => item.id === 'chat-anh')?.soChuaDoc,
  ).toBe(1);
  let firstId = '';
  let secondId = '';
  await ReactTestRenderer.act(async () => {
    firstId = current.moChat('linh');
    secondId = current.moChat('linh');
  });
  expect(firstId).toBe(secondId);
  expect(
    current.troChuyen.filter(item => item.nguoiDungId === 'linh'),
  ).toHaveLength(1);
  expect(current.tinNhan[firstId]).toHaveLength(0);
  expect(current.guiTin(firstId, '   ')).toBe(false);
  await ReactTestRenderer.act(async () => {
    current.guiTin(firstId, '  Chào Linh!  ');
  });
  expect(current.tinNhan[firstId]).toHaveLength(1);
  expect(current.tinNhan[firstId][0].noiDung).toBe('Chào Linh!');
  expect(current.tinNhan[firstId][0].nguoiGuiId).toBe('me');
  expect(current.troChuyen[0].id).toBe(firstId);
});

test('marks notifications read, changes settings and resets session data on logout', async () => {
  await ReactTestRenderer.act(async () => {
    current.dangNhap('hung', 'pass');
  });
  await ReactTestRenderer.act(async () => {
    current.docThongBao('n1');
    current.doiOnline(false);
    current.doiBadge(false);
  });
  expect(current.thongBao.filter(item => !item.daDoc)).toHaveLength(1);
  expect(current.hienThiOnline).toBe(false);
  expect(current.hienThiBadge).toBe(false);
  await ReactTestRenderer.act(async () => {
    current.docTatCaThongBao();
    current.guiTin('chat-an', 'Tin trong phiên cũ');
  });
  expect(current.thongBao.every(item => item.daDoc)).toBe(true);
  expect(current.tinNhan['chat-an']).toHaveLength(4);
  await ReactTestRenderer.act(async () => {
    current.dangXuat();
  });
  expect(current.taiKhoan).toBeNull();
  expect(current.thongBao.filter(item => !item.daDoc)).toHaveLength(2);
  expect(current.tinNhan['chat-an']).toHaveLength(3);
  expect(current.hienThiOnline).toBe(true);
  expect(current.hienThiBadge).toBe(true);
});

test('searches Vietnamese names and previews without case or accent sensitivity', () => {
  expect(khopTimKiem('Nguyễn An', '  NGUYEN an ')).toBe(true);
  expect(khopTimKiem('Bạn: Chiều nay gặp ở thư viện.', 'THU VIEN')).toBe(true);
  expect(khopTimKiem('Hoàng Linh', 'không tồn tại')).toBe(false);
});
