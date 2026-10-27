import r1 from "./img/rooms/room-1.jpg";
import r2 from "./img/rooms/room-2.jpg";
import r3 from "./img/rooms/room-3.jpg";
import r4 from "./img/rooms/room-4.jpg";
import r5 from "./img/rooms/room-5.jpg";
import r6 from "./img/rooms/room-6.jpg";
import r7 from "./img/rooms/room-7.jpg";
import r8 from "./img/rooms/room-8.jpg";
import r9 from "./img/rooms/room-9.jpg";
import r10 from "./img/rooms/room-10.jpg";
import r11 from "./img/rooms/room-11.jpg";
import r12 from "./img/rooms/room-12.jpg";
import r13 from "./img/rooms/room-13.jpg";
import r14 from "./img/rooms/room-14.jpg";
import r15 from "./img/rooms/room-15.jpg";
import r16 from "./img/rooms/room-16.jpg";
import r17 from "./img/rooms/room-17.jpg";
import r18 from "./img/rooms/room-18.jpg";
import r19 from "./img/rooms/room-19.jpg";
import r20 from "./img/rooms/room-20.jpg";
import r21 from "./img/rooms/room-21.jpg";
import r22 from "./img/rooms/room-22.jpg";
import r23 from "./img/rooms/room-23.jpg";
import r24 from "./img/rooms/room-24.jpg";
import r25 from "./img/rooms/room-25.jpg";
import r26 from "./img/rooms/room-26.jpg";
import r27 from "./img/rooms/room-27.jpg";
import r28 from "./img/rooms/room-28.jpg";
import r29 from "./img/rooms/room-29.jpg";
import r30 from "./img/rooms/room-30.jpg";
import r31 from "./img/rooms/room-31.jpg";
import r32 from "./img/rooms/room-32.jpg";
import r33 from "./img/rooms/room-33.jpg";
import r34 from "./img/rooms/room-34.jpg";
import r35 from "./img/rooms/room-35.jpg";
import r36 from "./img/rooms/room-36.jpg";
import r37 from "./img/rooms/room-37.jpg";
import r38 from "./img/rooms/room-38.jpg";
import r39 from "./img/rooms/room-39.jpg";
import r40 from "./img/rooms/room-40.jpg";
import r41 from "./img/rooms/room-41.jpg";
import r42 from "./img/rooms/room-42.jpg";

const R = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36, r37, r38, r39, r40, r41, r42];

// 매물 id → 사진: 사진 38장을 매물 38개에 한 장씩만 연결 (겹침 없음)
const first = [1, 3, 6, 4, 5, 7, 2, 8]; // id 0~7 (기존 순서 유지)
const apt = [25, 11, 20, 35, 34, 36]; // id 26~31 아파트: 거실·주방 사진
const used = new Set([...first, ...apt]);
// 나머지 사진은 비슷한 사진이 이웃하지 않게 섞어서 id 8~25, 32~37 에 배정
const others = Array.from({ length: 38 }, (_, k) => k + 1).filter((n) => !used.has(n));
const shuffled = others.map((_, k) => others[(k * 7) % others.length]);
const slots = [...Array.from({ length: 18 }, (_, k) => 8 + k), ...Array.from({ length: 6 }, (_, k) => 32 + k)];

const byId: Record<number, number> = {};
first.forEach((n, i) => (byId[i] = n));
apt.forEach((n, i) => (byId[26 + i] = n));
slots.forEach((id, i) => (byId[id] = shuffled[i]));
// 오피스텔·상가·공장 사진 (새로 추가한 사진)
byId[45] = 39; // 오피스텔
byId[39] = 40; // 상가
byId[46] = 41; // 공장
byId[43] = 42; // 공장

export const roomPhoto = (id: number): string | undefined => (byId[id] ? R[byId[id] - 1].src : undefined);
