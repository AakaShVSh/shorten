import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [Url, setUrl] = useState({ original_url: "" });
  const [data, setsdata] = useState([]);
  const [shortCode, setShortcode] = useState("");
  const [shorturls, setshorturls] = useState([]);
  // const [five]
  const getUrl = async () => {
    try {
      const urldata = await axios.post(
        "https://url-shortener-xtov.onrender.com/api/shorten/",
        Url
      );
      setsdata(urldata.data);
      setShortcode(urldata.data.short_code);
      if (shorturls.length % 5 == 0 && shorturls.length !== 1) {
        const temp = shorturls;
        temp.shift();
        setshorturls([...temp, urldata.data.short_code]);
      }
      setshorturls([...shorturls, urldata.data.short_code]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(shortCode, data, shorturls);

  const redirect = async (code) => {
    Linking.openURL(`https://url-shortener-xtov.onrender.com/${code}`);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter Url"
          onChangeText={(text) => setUrl({ ...Url, original_url: text })}
        />
        {shortCode !== "" ? (
          <Text onPress={() => redirect(shortCode)}>
            https://url-shortener-xtov.onrender.com/{shortCode}
          </Text>
        ) : null}
        <Button style={styles.button} title="Submit" onPress={getUrl} />
        <View>
          <Text style={styles.pasturlcontainer}>Past Urls</Text>
          {shorturls.map((e, i) => (
            // <Text></Text>
            <>
              {e == shortCode ? null : (
                <Text onPress={() => redirect(e)}>
                  https://url-shortener-xtov.onrender.com/{e}
                </Text>
              )}
            </>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pasturlcontainer:{
    marginTop:5,
  }
});
