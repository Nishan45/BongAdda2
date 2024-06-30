import { View, Text, Modal, TouchableOpacity, Image, ScrollView, Animated, useWindowDimensions, BackHandler } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';




const default_image = require('../../assets/grey.png')

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

function ViewPost({ url, width, height, borderradius, story, title, body, author }) {
    const [show, setShow] = useState(false)
    const close = () => {
        setShow(false)
    }
    const[image_width,setWidth]=useState(0)
    const[image_height,setHeight]=useState(0)
    windowWidth=useWindowDimensions().width;
    windowHeight=useWindowDimensions().height;
    const{t}=useTranslation();

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
    const getUrl=(url)=>{
        if(!url || url=="assets/grey.png"){
            return "assets/grey.png";
        }
        const array=url.split('upload')
        return array[0]+`upload/if_w_gt_1000,c_scale,w_1000/q_auto:best/f_jpg`+array[1]
    }
    
    
    return (
        <View style={{alignSelf:'center',height:height}}>
            <TouchableOpacity onPress={() => { 
                if(!story && url){
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
                <View style={{ width: width, height: height, borderRadius: borderradius, backgroundColor: "#DCDCDC" }}>
                    {url?<Image source={{ uri: getUrl(url) }}
                      style={{ width: width, height: height, borderRadius: borderradius}}/>:null}
                </View>:
                    <View style={{alignItems: "center",justifyContent:'center', borderWidth: 1,backgroundColor:"white",width:width,height:height}}>
                        <Text numberOfLines={12} style={{ padding: 20, fontSize: 17 }}>{body}</Text>
                        <Text numberOfLines={1} style={{color:"blue",marginBottom:10}}>{t("Tap to see")}</Text>
                    </View>   
                }
                
            </TouchableOpacity>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={close}
            >   
                <View style={{ flexDirection:'row',backgroundColor:windowWidth<=700?'black':'#000000AA' ,height:'100%',flex:1 }}
                >
                {windowWidth>=700?<TouchableOpacity style={{width:'25%'}}
                    onPress={close}
                    >
                    </TouchableOpacity>:null}
                    <View style={{ justifyContent:'center',alignItems:'center',flex:1,height:'100%'}}>
                        <View style={{position:'absolute',margin:'auto',right:'1%',top:'1%',zIndex:5}}>
                        <Ionicons name="close-circle" size={40} color="#CCD1D1" onPress={close}/>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
                            {(!story  && image_width!=0 && image_height!=0 )?
                            <GestureHandlerRootView style={{justifyContent:'center'}}>
                                <PinchGestureHandler
                                onGestureEvent={onzomevent}
                                onHandlerStateChange={onzoomchange}
                                >
                                <Animated.Image
                                source={{uri:getUrl(url)}}
                                style={{width:windowWidth>=700?windowWidth*0.5:windowWidth,
                                    height:windowWidth>=700?Math.floor((image_height/image_width)*(windowWidth*0.5)):Math.floor((image_height/image_width)*windowWidth),
                                    transform:[{scale:scale}],
                                }}
                                resizeMode={'contain'}
                                />
                            </PinchGestureHandler>
                            </GestureHandlerRootView>:null}
                            {story?
                                <View style={{width:windowWidth>=700?windowWidth*0.5:windowWidth,flex:1, backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
                                    {title?
                                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:20,marginBottom:20}}>
                                    <Text style={{ fontSize: 17 }}>{t("Title")}: </Text>
                                    <Text style={{ fontSize: 17 }}>{title}</Text>
                                    </View>:null
                                     }
                                    <Text style={{ padding: 20, fontSize: 17 }}>{body}</Text>
                                    {author?
                                    <Text style={{ fontSize: 17, padding: 20 }}>{t("Author")}: {author}</Text>:null
                                    }
                                </View>:null
                            }
                        </ScrollView> 
                    </View>
                    {windowWidth>=700?<TouchableOpacity style={{width:'25%'}}
                    onPress={close}
                    >
                    </TouchableOpacity>:null}
                </View>
            </Modal>
        </View>
    )
}
export default memo(ViewPost)