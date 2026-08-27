import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FeatureCards() {
  return(
    <View style={styles.container} testID="feature-cards">
<View style={styles.card} testID="feature-card-1">
  <Text style={styles.icon}>⚛️</Text>
  <Text style={styles.title}>React</Text>
  <Text style={styles.descrip}>Components</Text>
</View>

<View style={styles.card} testID="feature-card-2">
  <Text style={styles.icon}>🍃</Text>
  <Text style={styles.title}>Node</Text>
  <Text style={styles.descrip}>Components</Text>
</View>

<View style={styles.card} testID="feature-card-3">
  <Text style={styles.icon}>🟩</Text>
  <Text style={styles.title}>MongoDB</Text>
  <Text style={styles.descrip}>Components</Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#114A84',
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:12,
    flexWrap:'wrap'
  },
  
  card:{
    flex:1,
    minWidth:90,
    maxWidth:120,
    padding:16,
    alignItems:'center',
    borderRadius:16,
    backgroundColor:'#2E3133',
    marginTop:40,
    borderWidth:2,
    borderColor:'#fff',
  },
  icon:{
    fontSize:28,
    marginBottom:10,
  },
  title:{
    color:'#fff',
    fontSize:16,
    fontWeight:'700',
    marginBottom:4
  },
  descrip:{
    fontSize:12,
    color:'#ABACAD',
    textAlign:'center',
  }
})