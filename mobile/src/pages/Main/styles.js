import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar:{
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260,
    // backgroundColor: '#000'
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  // devBio: {
    
  //   marginTop: 5,
  // },

  devTechs: {
    color: '#666',
    marginTop: 5,
  },

  searchForm:{
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3,
  },

  loadButton: {
    width: 60,
    height: 60,
    backgroundColor: '#7D40E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

});

export default styles;