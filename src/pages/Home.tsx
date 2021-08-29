import {useState, useEffect} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonFab,IonFabButton,IonModal} from '@ionic/react';
import { trash, add } from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';



export interface Todo {
  id: number;
  text: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);

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
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton title="Add Todo" onClick={() => setShowModal(true)}>
            <IonIcon data-icon="add" icon={add} />
          </IonFabButton>
        </IonFab>
        <IonModal
          onDidDismiss={() => setShowModal(false)}
          isOpen={showModal}
        >
          {/* Todo Form will go here */}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
export default Home;
