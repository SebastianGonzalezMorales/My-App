import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // half modal
  halfModalContent: {
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    height: 200,
    marginTop: 'auto',
  },
  halfModalWrapper: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },

  // modal
  modalContent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modalTitle: {
    color: '#666a72',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    marginTop: 20, // Añadido para dar más espacio superior
  },
  flatlistWrapper: {
    paddingHorizontal: 30,
  },

  // small modal
  smallModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallModalContent: {
    backgroundColor: '#5da5a9',
    borderRadius: 10,
    height: 140,
    width: '80%',
  },
  modalToggleExit: {
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 20,
  },
  smallModalTitle: {
    paddingTop: 20,
    paddingLeft: 20,
    fontFamily: 'DoppioOne',
    color: '#f2f2f2',
    fontSize: 20,
  },
  smallModalText: {
    paddingLeft: 20,
    paddingTop: 20,
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
  },
  smallModalTextTwo: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    paddingLeft: 20,
  },
});
