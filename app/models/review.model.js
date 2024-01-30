module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      happy: {
        type: Sequelize.INTEGER,
        comment: "1: 非常に満足  0: 一部の苦情"
      },
      //happy point
      sex: {
        type: Sequelize.INTEGER, 
        comment: "1: 男性, 2: 女性, 3: その他, 4: 回答しない"
      },
      age: {
        type: Sequelize.INTEGER, 
        comment: "1: 10代以下, 2: 20代, 3: 30代, 4: 40代, 5: 50代, 6: 60代以上"
      },
      sex_doctor: {
        type: Sequelize.INTEGER,
        comment: "1: 男性, 2: 女性"
      },
      age_doctor: {
        type: Sequelize.INTEGER,
        comment: "1: 10代以下, 2: 20代, 3: 30代, 4: 40代, 5: 50代, 6: 60代以上"
      },
      stage_today: {
        type: Sequelize.INTEGER,
        comment: "1: 通りすがりで気になって, 2: 近所, 3: 食べログ, 4: Instagram, 5: Twitter, 6: Google Mapsの検索, 7: Googleのクチコミ, 8: 広告, 9: 知人からの紹介, 10: その他"
      },

      //no happy point
      cure: {
        type: Sequelize.INTEGER,
        comment: "1: かなり良い, 2: 良い, 3: 普通, 4: 良くない, 5: 悪い"
      },
      waiter: {
        type: Sequelize.INTEGER,
        comment: "1: かなり良い, 2: 良い, 3: 普通, 4: 良くない, 5: 悪い"
      },
      pointer: {
        type: Sequelize.STRING,
        comment: "ユーザーが望むポイントを保管してください。"
      }

    });
  
    return review;
  };
  