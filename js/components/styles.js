import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row'
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  listCell: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height:40,
  },
});
export default styles;
