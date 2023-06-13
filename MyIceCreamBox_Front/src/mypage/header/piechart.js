import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import { width, height } from '../../global/dimension';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const Pie = () => {
  const [data, setData] = useState([{}]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        axios({
          method: 'get',
          url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/gifts/statistics/gift-rate',
          headers: {
            Authorization: `${token}`,
          },
        })
          .then(function (res) {
            setData(res.data.data.giftsStatisticsResList);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);

  var max = 0;
  var name = '';
  var total = data.length;
  var rate = 0;

  const getChartData = () => {
    var b = 0;
    var c = 0;
    var cpd = 0;
    var ctd = 0;
    var mba = 0;
    var o = 0;
    var p = 0;
    var so = 0;
    var strawberry = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].iceCreamName === '이거먹으면나랑사귀는바') o++;
      if (data[i].iceCreamName === '이거먹으면에이쁠받는바') p++;
      if (data[i].iceCreamName === '이거먹으면추워바') c++;
      if (data[i].iceCreamName === '흑마법사가만든저체온증바') b++;
      if (data[i].iceCreamName === '쿨복숭아쌍쌍바') cpd++;
      if (data[i].iceCreamName === '초콜릿태닝쌍쌍바') ctd++;
      if (data[i].iceCreamName === '물고기도반한에어콘') mba++;
      if (data[i].iceCreamName === '여름이온지얼마나오렌지콘') so++;
      if (data[i].iceCreamName === '베리베리더워콘') strawberry++;
    }

    const arr = [b, c, cpd, ctd, mba, o, p, so, strawberry];

    for (var a = 0; a < 9; a++) {
      if (max < arr[a]) {
        max = arr[a];
      }
    }
    if (total === 0) {
      rate = 0;
    } else {
      rate = (max * 100) / total;
    }

    if (max === o) {
      name = '이거먹으면나랑사귀는바';
    } else if (max === p) {
      name = '이거먹으면에이쁠받는바';
    } else if (max === c) {
      name = '이거먹으면추워바';
    } else if (max === b) {
      name = '흑마법사가만든저체온증바';
    } else if (max === cpd) {
      name = '쿨복숭아쌍쌍바';
    } else if (max === ctd) {
      name = '초콜릿태닝쌍쌍바';
    } else if (max === mba) {
      name = '물고기도반한에어콘';
    } else if (max === so) {
      name = '여름이온지얼마나오렌지콘';
    } else if (max === strawberry) {
      name = '베리베리더워콘';
    }

    const iceCream = [
      {
        name: '사귀는...',
        population: o,
        color: '#FFB08E',
      },
      {
        name: '에이쁠...',
        population: p,
        color: '#FFCCEB',
      },
      {
        name: '추워바...',
        population: c,
        color: '#CCE0FF',
      },
      {
        name: '저체온...',
        population: b,
        color: '#A9949B',
      },
      {
        name: '복숭아...',
        population: cpd,
        color: '#FF9ABE',
      },
      {
        name: '초콜릿...',
        population: ctd,
        color: '#9E7C22',
      },
      {
        name: '물고기...',
        population: mba,
        color: '#00C6D2',
      },
      {
        name: '오렌지...',
        population: so,
        color: '#FFF3B6',
      },
      {
        name: '더워콘...',
        population: strawberry,
        color: '#F87676',
      },
    ];

    return iceCream;
  };

  const renderDescriptions = () => {
    const chartData = getChartData();
    const rows = [];

    for (let i = 0; i < chartData.length; i += 3) {
      const row = chartData.slice(i, i + 3);
      const rowItems = row.map((item, index) => (
        <View key={index} style={styles.descriptionRow}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
        </View>
      ));
      rows.push(
        <View key={i} style={styles.descriptionRowContainer}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  useEffect(() => {
    loadFonts();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      locus_sangsang: require('../../../assets/fonts/locus_sangsang.ttf'),
    });
    setFontsLoaded(true);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={getChartData()}
          width={width * 0.533}
          height={height * 0.15}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={false}
        />
      </View>
      <View style={styles.legendContainer}>{renderDescriptions()}</View>
      <Text style={styles.many}>{`${name + ' ' + rate + '%'}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chartContainer: {
    position: 'absolute',
    left: 0,
  },
  legendContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    right: 30,
    position: 'absolute',
  },

  descriptionRowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 2,
    marginRight: 3,
    marginBottom: 3,
  },
  legendText: {
    fontFamily: 'locus_sangsang',
    fontSize: 10,
  },
  many: {
    position: 'absolute',
    top: 52,
    fontFamily: 'locus_sangsang',
    backgroundColor: '#FFF',
    fontSize: 14,
    color: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

export default Pie;
