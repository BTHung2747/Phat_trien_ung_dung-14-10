export const kiemTraDangNhap = (taiKhoan: string, matKhau: string) => ({
  taiKhoan: taiKhoan.trim() ? undefined : 'Vui lòng nhập tài khoản.',
  matKhau: matKhau.trim() ? undefined : 'Vui lòng nhập mật khẩu.',
});
