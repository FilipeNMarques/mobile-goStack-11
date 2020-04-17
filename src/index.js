import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar } from 'react-native'

import api from './services/api'

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log("App -> response.data", response.data)
    })
  }, [])
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
    {/* <View  style={styles.container}>
      {
        repositories.map(repository => (
          <Text key={repository.id} style={styles.repositories}>
            {repository.title}
          </Text>
        ))
      }
    </View> */}

    <SafeAreaView style={styles.container}>
      <FlatList 
            data={repositories} // Need to be a array
            keyExtractor={repository => repository.id}
            renderItem={({item: repository}) => (
              <Text style={styles.repositories}>
                {repository.title}
              </Text>
            )}
          />
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },
  repositories: {
    fontSize: 30,
    color: '#fff',
    flexDirection: 'column',
  }
})