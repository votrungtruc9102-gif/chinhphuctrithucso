import { Lesson } from '../../types';
import { toanLessons } from './toan';
import { vanLessons } from './van';
import { tiengAnhLessons } from './tiengAnh';
import { khtnLessons } from './khtn';
import { tinHocLessons } from './tinHoc';
import { lichSuDiaLyLessons } from './lichSuDiaLy';
import { gdcdLessons } from './gdcd';
import { congNgheLessons } from './congNghe';
import { chuyenDeLessons } from './chuyenDe';

export const ALL_CURRICULUM_LESSONS: Lesson[] = [
  ...toanLessons,
  ...vanLessons,
  ...tiengAnhLessons,
  ...khtnLessons,
  ...tinHocLessons,
  ...lichSuDiaLyLessons,
  ...gdcdLessons,
  ...congNgheLessons,
  ...chuyenDeLessons
];
