import { useAccordionButton } from "react-bootstrap/esm/AccordionButton";

function CustomToggleAccordion({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ backgroundColor: 'pink' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

export default CustomToggleAccordion;