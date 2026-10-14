import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ONhap, type ONhapRef } from '../../components/ONhap';
import { BieuTuong } from '../../components/common';
import { useChat } from '../../state/ChatContext';
import { themeChat as theme } from '../../styles/theme';
import { kiemTraDangNhap } from '../../utils/dangNhap';
import { styles } from './styles';

export const DangNhapChat = () => {
  const { dangNhap, moDuAnCu } = useChat();
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof kiemTraDangNhap>>({
    taiKhoan: undefined,
    matKhau: undefined,
  });
  const accountRef = useRef<ONhapRef>(null);
  const passwordRef = useRef<ONhapRef>(null);
  const submit = () => {
    const nextErrors = kiemTraDangNhap(taiKhoan, matKhau);
    setErrors(nextErrors);
    if (nextErrors.taiKhoan) {
      accountRef.current?.focus();
      return;
    }
    if (nextErrors.matKhau) {
      passwordRef.current?.focus();
      return;
    }
    Keyboard.dismiss();
    dangNhap(taiKhoan, matKhau);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formWidth}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>UDU</Text>
            </View>
            <Text style={styles.appName}>UDU CHAT</Text>
            <Text style={styles.title} accessibilityRole="header">
              Một lời chào,{'\n'}thêm kết nối.
            </Text>
            <Text style={styles.subtitle}>
              Đăng nhập để tiếp tục những cuộc trò chuyện của bạn.
            </Text>
            <View style={styles.form}>
              <ONhap
                ref={accountRef}
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                value={taiKhoan}
                error={errors.taiKhoan}
                onChangeText={value => {
                  setTaiKhoan(value);
                  setErrors(current => ({ ...current, taiKhoan: undefined }));
                }}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <ONhap
                ref={passwordRef}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                password
                value={matKhau}
                error={errors.matKhau}
                onChangeText={value => {
                  setMatKhau(value);
                  setErrors(current => ({ ...current, matKhau: undefined }));
                }}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={submit}
              />
              <TouchableOpacity
                onPress={submit}
                activeOpacity={0.7}
                style={styles.submit}
                accessibilityRole="button"
              >
                <Text style={styles.submitText}>Đăng nhập</Text>
                <BieuTuong name="next" color={theme.colors.white} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.footer}>
              Kết nối lớp học · Chia sẻ mỗi ngày
            </Text>
            {!!moDuAnCu && (
              <TouchableOpacity
                onPress={moDuAnCu}
                activeOpacity={0.65}
                accessibilityRole="button"
                style={styles.legacy}
              >
                <Text style={styles.legacyText}>Mở dự án ban đầu</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
