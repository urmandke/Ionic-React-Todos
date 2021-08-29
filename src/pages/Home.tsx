import {useState, useEffect} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon} from '@ionic/react';
import { trash } from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';



export interface Todo {
  id: number;
  text: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function doFetch() {
      const result = await fetch('/assets/todos.json');
      const data = await result.json();
      setTodos(data);
    }
    doFetch();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
            {todos.map((todo, i) => (
              <IonItem key={i}>
                <IonLabel>
                  <h2>{todo.text}</h2>
                </IonLabel>
                <IonIcon data-icon="trash" icon={trash} color="danger" slot="end" />
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Home;
