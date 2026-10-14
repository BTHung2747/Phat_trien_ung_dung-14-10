import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HangThongBao } from '../../components/HangThongBao';
import { TieuDeManHinh, TrangRong } from '../../components/common';
import { useChat } from '../../state/ChatContext';
import { styles } from './styles';

export const ThongBaoChat = () => {
  const { thongBao, docThongBao, docTatCaThongBao } = useChat();
  const count = thongBao.filter(item => !item.daDoc).length;
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <FlatList
        data={thongBao}
        keyExtractor={notice => notice.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <TieuDeManHinh
              title="Thông báo"
              subtitle="Những cập nhật dành cho bạn"
            />
            <View style={styles.actions}>
              <Text style={styles.summary} accessibilityLiveRegion="polite">
                {count ? `${count} thông báo chưa đọc` : 'Bạn đã đọc tất cả'}
              </Text>
              <TouchableOpacity
                disabled={!count}
                accessibilityState={{ disabled: !count }}
                onPress={docTatCaThongBao}
                activeOpacity={0.65}
                accessibilityRole="button"
                style={[styles.readAll, !count && styles.disabled]}
              >
                <Text style={styles.readAllText}>Đọc tất cả</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={<TrangRong title="Chưa có thông báo" icon="bell" />}
        renderItem={({ item }) => (
          <HangThongBao notice={item} onPress={() => docThongBao(item.id)} />
        )}
      />
    </SafeAreaView>
  );
};
