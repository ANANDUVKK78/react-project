import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'App'
import { sagaMiddleware, store } from 'store'
import { rootSaga } from 'saga'

sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
