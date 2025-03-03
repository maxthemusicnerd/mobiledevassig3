import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const CallAPI = () => {
    const [stuff, setStuff] = useState<string>("");

    const [month, setMonth] = useState<string>("1");

    const [day, setDay] = useState<string>("1");

    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    const monthDayPairs = {
        "1": 31,  
        "2": 28,  
        "3": 31,  
        "4": 30,  
        "5": 31,  
        "6": 30,  
        "7": 31,  
        "8": 31,  
        "9": 30,  
        "10": 31, 
        "11": 30, 
        "12": 31 
    };

    useEffect(() => {
        const days = monthDayPairs[month as keyof typeof monthDayPairs];
        setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));

        if (parseInt(day) > days) {
            setDay("1");
        }
    }, [month]);


    useEffect(() => {
        const makeCall = async () => {
            try {
                const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "b45518431amsh3032bad605ed4f7p155850jsnd5bec74d3af1", 
                        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.text(); 
    
                setStuff(data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        };
        makeCall();
    }, [month, day]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{stuff}</Text>
            <Picker
            selectedValue={month}
            onValueChange={(itemValue) => setMonth(itemValue)}>
                <Picker.Item label="January" value="1"/>
                <Picker.Item label="February" value="2"/>
                <Picker.Item label="March" value="3"/>
                <Picker.Item label="April" value="4"/>
                <Picker.Item label="May" value="5"/>
                <Picker.Item label="June" value="6"/>
                <Picker.Item label="July" value="7"/>
                <Picker.Item label="August" value="8"/>
                <Picker.Item label="September" value="9"/>
                <Picker.Item label="October" value="10"/>
                <Picker.Item label="November" value="11"/>
                <Picker.Item label="December" value="12"/>
            </Picker>

            <Picker
                selectedValue={day}
                onValueChange={(itemValue) => setDay(itemValue)}
            >
                {daysInMonth.map((num) => (
                    <Picker.Item key={num} label={num.toString()} value={num.toString()} />
                ))}
            </Picker>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        fontSize: 16,
        textAlign: "left",
    },
});

export default CallAPI;