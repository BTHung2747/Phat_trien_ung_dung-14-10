import React, { useMemo, useState } from 'react';
import { FlatList, Keyboard, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ChatTabScreenProps } from '../../navigation/types';
import { HangTroChuyen } from '../../components/HangTroChuyen';
import { NguoiTrucTuyen } from '../../components/NguoiTrucTuyen';
import { ThanhTimKiem } from '../../components/ThanhTimKiem';
import { TieuDeManHinh, TrangRong } from '../../components/common';
import { useChat } from '../../state/ChatContext';
import { khopTimKiem } from '../../utils/timKiem';
import { thoiGianTroChuyen } from '../../utils/thoiGian';
import { styles } from './styles';

export const HomeChat = ({ navigation }: ChatTabScreenProps<'Home'>) => {
  const chat = useChat();
  const [query, setQuery] = useState('');
  const items = useMemo(
    () =>
      chat.troChuyen
        .map(item => {
          const user = chat.nguoiDung.find(
            person => person.id === item.nguoiDungId,
          )!;
          const messages = chat.tinNhan[item.id] || [];
          const last = messages[messages.length - 1];
          const sender =
            last?.nguoiGuiId === 'me'
              ? 'Bạn: '
              : user.laNhom && last
              ? `${
                  chat.nguoiDung.find(person => person.id === last.nguoiGuiId)
                    ?.tenNgan || 'Thành viên'
                }: `
              : '';
          return {
            chat: item,
            user,
            last,
            message: last ? sender + last.noiDung : 'Bắt đầu cuộc trò chuyện',
          };
        })
        .filter(item => khopTimKiem(item.user.ten + ' ' + item.message, query)),
    [chat.troChuyen, chat.nguoiDung, chat.tinNhan, query],
  );
  const open = (nguoiDungId: string) => {
    Keyboard.dismiss();
    const troChuyenId = chat.moChat(nguoiDungId);
    navigation.navigate('NoiDungChat', { troChuyenId });
  };
  const firstName = chat.taiKhoan?.tenHienThi.split(' ').pop() || 'bạn';
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <FlatList
        data={items}
        keyExtractor={item => item.chat.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <TieuDeManHinh
              title="Cùng trò chuyện"
              eyebrow={`Chào ${firstName}, hôm nay thế nào?`}
              onProfile={() => navigation.navigate('CaiDat')}
            />
            <ThanhTimKiem
              value={query}
              onChange={setQuery}
              placeholder="Tìm kiếm cuộc trò chuyện"
            />
            {!query.trim() && (
              <NguoiTrucTuyen
                users={chat.nguoiDung.filter(
                  user => user.online && !user.laNhom,
                )}
                onPress={user => open(user.id)}
              />
            )}
          </View>
        }
        ListEmptyComponent={
          <TrangRong
            title="Không tìm thấy cuộc trò chuyện"
            subtitle="Thử một tên hoặc nội dung tin nhắn khác nhé."
          />
        }
        renderItem={({ item }) => (
          <HangTroChuyen
            user={item.user}
            chat={item.chat}
            message={item.message}
            time={item.last ? thoiGianTroChuyen(item.last.thoiGian) : 'Mới'}
            onPress={() => open(item.user.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
