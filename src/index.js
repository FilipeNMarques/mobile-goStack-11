import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log("App -> response.data", response.data)
    })
  }, [])

  async function handleAddRepo() {
    const response = await api.post('repositories', {
      url: "https://github.com/OwnerCode/E.Moura",
      title: `FullERP, ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript", "ReactJS"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository])
    console.log("handleAddRepo -> repository", repository)
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
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
          <TouchableOpacity
           activeOpacity={0.6}
           style={styles.button}
           onPress={handleAddRepo}
           >
            <Text style={styles.buttonText}>
              Adicionar Repositório
            </Text>
          </TouchableOpacity>
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
  },
  button: {
    backgroundColor: '#fff',
    margin: 30,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14

  }
})