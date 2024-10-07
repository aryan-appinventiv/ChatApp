import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Images from '../assets';
import colors  from '../utils/color'
interface ConfirmationModalProps {
  visible: boolean;
  cancel: () => void;
  deleted: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, cancel, deleted }) => {
    return (
            <Modal
               visible={visible}
               transparent
            >
                <TouchableWithoutFeedback onPress={cancel}>
              <View style={styles.ModalCont}>
                <View style={styles.modal}>
                    <View style={styles.delImgCont}>
                    <Image source={Images.delete} style={styles.delImg}/>
                    </View>
                    <Text style={styles.delText}>Delete message?</Text>
                    <Text style={styles.deltext2}>Are you sure want to delete this message?</Text>
                    <View style={styles.buttonCont}>
                      <TouchableOpacity style={styles.NoButton} onPress={cancel}>
                        <Text style={styles.NoButtonText}>No, Cancel</Text>
                      </TouchableOpacity>  
                      <TouchableOpacity style={styles.YesButton} onPress={deleted}>
                        <Text style={styles.YesButtonText}>Yes, Delete</Text>
                      </TouchableOpacity>
                    </View>
                
                </View>
              </View>
              </TouchableWithoutFeedback>
            </Modal>
          );
        }
        
        export default ConfirmationModal;
        
        const styles = StyleSheet.create({
          ModalCont:{
            flex:1,
            backgroundColor:colors.blurBackground,
            justifyContent:'center',
            alignItems:'center',
          },
          modal:{
            height:'30%',
            width:'85%',
            backgroundColor:colors.white,
            borderRadius:20,
          },
          delImg:{
            height:30,
            width:30,
          },
          delCont:{
            justifyContent:'center'
          },
          delText:{
            fontWeight:'600',
            fontSize:25,
            alignSelf:'center',
            marginTop:20,
          },
          deltext2:{
            color:colors.gray,
            alignSelf:'center',
            marginTop:10,
          },
          delImgCont:{
            height:50,
            width:50,
            backgroundColor:colors.lightred,
            borderRadius:50,
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            marginTop:40,
          },
          buttonCont:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:40,
            marginTop:30,
          },
          NoButton:{
            backgroundColor:colors.secondary,
            paddingVertical:15,
            paddingHorizontal:25,
            borderRadius:5,
          },
          YesButton:{
            backgroundColor:colors.primary,
            paddingVertical:15,
            paddingHorizontal:25,
            borderRadius:5,
          },
          YesButtonText:{
            color:colors.white,
            fontWeight:'600',
          },
          NoButtonText:{
            fontWeight:'600',
            fontSize:15
          }
        
        })
