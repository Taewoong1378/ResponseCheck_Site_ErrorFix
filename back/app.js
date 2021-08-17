const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const hpp = require('hpp');
const { sequelize } = require('./models');

const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const db = require('./models');
const logger = require('./logger');

dotenv.config();
const app = express();
// 개발할 때 포트와 배포할 때 포트를 다르게 한다
// 나중에는 .env에 PORT=80을 넣어줄 것.
app.set('port', process.env.PORT || 3065);

// 시퀄라이즈 설정
db.sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: 'http://nodebird.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/users', usersRouter);

// 404처리 미들웨어
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info('hello');
  logger.error(error.message);
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // 개발 모드일 때는 에러를 보여주게 하고, 배포일 때는 보여주지 않게 하는 코드
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(80, () => {
  console.log('서버 실행 중!');
});