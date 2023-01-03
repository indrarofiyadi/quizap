import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correntOption, setCorrentOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrentOption(correct_option);
        setIsOptionDisabled(true);
        if(selectedOption==correct_option){
            //set score
            setScore(score+1)
        }
        // Show Next Button
    }

    const renderQuestion = () => {
        return (
            <View>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6, }}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                        onPress={()=>validateAnswer(option) }
                        key={option}
                        style={{
                            borderWidth: 3, borderColor: COLORS.secondary+'40',
                            backgroundColor: COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* show check or cross icon based on correct answer */}
                            {
                                option==correntOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcon name="check " style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }}/>
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcon name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }}/>                                  
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position:'relative'
            }}>

                {/* progressBar */}

                {/* Question */}
                {renderQuestion()}

                {/* options */}
                
                {renderOptions()}

                {/* Next Button */}

                {/* Background Image */}
                <Image 
                source= {require('../assets/images/DottedBG.png')}
                style={{ 
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5


                }}
                resizeMode={'contain'} 
                />


            </View>
        </SafeAreaView>
    )
}

export default Quiz