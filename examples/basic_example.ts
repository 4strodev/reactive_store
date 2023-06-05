import { Store } from '../src/store';

interface AuthStoreInterface {
	accessToken?: string;
	refreshToken?: string;
	username: string;
}
const authStore = new Store<AuthStoreInterface>({
	username: "No username set"
});

// Listening for changes
const usernameObservable = authStore.selectOnly(store => store.username);

// Now a console log is printed showing username
usernameObservable.subscribe(console.log)

// Making changes
authStore.patchState({ username: "Foo" });
// Now another console log is printed showing username
