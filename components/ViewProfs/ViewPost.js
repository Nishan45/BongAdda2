import { View, Text, Modal, TouchableOpacity, Image, ScrollView, Animated } from 'react-native'
import React, { memo, useState } from 'react'
import { Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const default_image = require('../../assets/grey.png')


function ViewPost({ url, width, height, borderradius, story, title, body, author }) {
    const [show, setShow] = useState(false)
    const close = () => {
        setShow(false)
    }
    const[image_width,setWidth]=useState(0)
    const[image_height,setHeight]=useState(0)

    const setImageSize=(uri)=>{
        if(uri=='./assets/grey.png'){
            return
        }
        try{
        Image.getSize(uri,(width,height)=>{
            setHeight(height)
            setWidth(width)
            setShow(true)
        })
        
    }catch(e){
        console.log(e)
    }
    
    }
    const scale=new Animated.Value(1)

    const onzomevent=Animated.event(
        [
            {
                nativeEvent:{scale:scale}
            }
        ],
        {
            useNativeDriver:true
        }
    )
    const onzoomchange=(event)=>{
        if(event.nativeEvent.oldState==State.ACTIVE){
            Animated.spring(scale,{
                toValue:1,
                useNativeDriver:true,
            }).start()
        }
    }
    
    return (
        <>

            <TouchableOpacity onPress={() => { 
                
                if(!story){
                    setImageSize(url)
                }
                if(image_width>0 && image_height>0){
                    setShow(true);
                }
                if(story){
                    setShow(true)
                }
                }} >
                    
                {!story ?
                    <Image source={{ uri: url }} style={{ width: width, height: height, borderRadius: borderradius, backgroundColor: "#DCDCDC" }} /> :
                    <View style={{ justifyContent: "center", alignItems: "center", borderWidth: 1,backgroundColor:"white" }}>
                        <View>
                        <Text style={{ padding: 20, fontSize: 17 ,maxHeight:200}}>{body}</Text>
                        </View>
                        <Text style={{color:"blue",marginBottom:10}}>দেখতে ট্যাপ করুন</Text>
                    </View>
                    
                }
                
            </TouchableOpacity>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={close}
            >

                <View style={{  flex: 1, justifyContent: "center",backgroundColor:"black"  }}>
                    <View style={{ justifyContent: "center", alignItems: "center"}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        
                            {!story  && image_width!=0 && image_height!=0 &&
                            <GestureHandlerRootView>
                                <PinchGestureHandler
                                
                                onGestureEvent={onzomevent}
                                onHandlerStateChange={onzoomchange}
                               >

                                <Animated.Image
                                source={{uri:url}}
                                style={{width:windowWidth,
                                    height:Math.floor((image_height/image_width)*windowWidth),
                                    
                                    transform:[{scale:scale}],
                                    
                                }}
                                resizeMode={'contain'}
                                
                                />
                            </PinchGestureHandler>
                            </GestureHandlerRootView> }
                            {story &&
                                <View style={{ backgroundColor:"white",width:windowWidth,justifyContent:"center",alignItems:"center"}}>
                                    {title &&
                                    <View style={{flexDirection:"row",justifyContent:"center",width:windowWidth-80,marginTop:20,marginBottom:20}}>
                                    <Text style={{ fontSize: 17 }}>শিরোনাম: </Text>
                                    <Text style={{ fontSize: 17 }}>{title}</Text>
                                    </View>
                                     }
                                    <Text style={{ padding: 20, fontSize: 17 }}>{body}</Text>
                                    {author &&
                                    <Text style={{ fontSize: 17, padding: 20 }}>লেখক: {author}</Text>
                                    }
                                </View>

                            }
                        
                        </ScrollView>
                    </View>
                </View>


            </Modal>

        </>
    )
}

export default memo(ViewPost)