/**
 * Application
 */
import React, { Fragment, FunctionComponent, useRef, useEffect, useState } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarConfig } from './AppConfig';
import './App.scss';

const startDate = new Date();
const endDate = new Date();
endDate.setHours(endDate.getHours() + 1);
const startDateStr = startDate.toISOString().substring(0, 19);
const endDateStr = endDate.toISOString().substring(0, 19);

const App: FunctionComponent = () => {
    const calendarRef = useRef<BryntumCalendar>(null);
    const calendarInstance = calendarRef.current?.instance;

    const [resourceId, setResourceId] = useState(1)

    const resources = [
        {
          id: resourceId,
          name: "Resource " + resourceId,
          eventColor: "green",
        },
    ]
    
    const events = [
        {
          id: 1,
          name: "Meeting",
          startDate: startDateStr,
          endDate: endDateStr,
          resourceId,
        },
    ]

    useEffect(() => {
        updateValues();
    }, [resourceId, calendarInstance]);


    function updateValues() {

        if(!calendarInstance) return

        calendarInstance?.eventStore.removeAll();
        calendarInstance?.resourceStore.removeAll();
    
        calendarInstance?.eventStore.add(events)
        calendarInstance?.resourceStore.add(resources);
    }

    return (
        <Fragment>
            
            <button onClick={() => setResourceId(id => id === 3 ? 1 : id + 1)}>Toggle resources and events</button>
            <BryntumCalendar
                ref = {calendarRef}
                {...calendarConfig}
            />
        </Fragment>
    );
};

export default App;


