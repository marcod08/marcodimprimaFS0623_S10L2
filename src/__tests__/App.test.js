import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import fantasy from '../data/fantasy.json';

describe('il componente app viene montato', () => {
    it('il componente welcome viene montato', () => {
        render(<App />);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });

    it('le card vengono renderizzate', () => {
        render(<App />);
        const cards = screen.getAllByTestId('card');
        expect(cards).toHaveLength(fantasy.length);
    });

    it('il componente commentArea viene montato', () => {
        render(<App />);
        const commentInput = screen.getByTestId('comment-input');
        expect(commentInput).toBeInTheDocument();
    });
});

describe('filter della ricerca', () => {
    it("cerca destiny", () => {
        render(<App />)
        const searchBar = screen.getByPlaceholderText('Cerca un libro');
        fireEvent.change(searchBar, { target: { value: 'destiny' } })
        const cards = screen.getAllByTestId('card');
        expect(cards).toHaveLength(3)
    })
})

describe('componente Singlebook', () => {
    it('le cards cambiano il bordo in rosso quando selezionate', () => {
        render(<App />)
        const cards = screen.getAllByTestId('card');
        const firstCard = cards[0]
        fireEvent.click(firstCard)
        expect(firstCard).toHaveStyle('border: 3px solid red')
    })

    it('le cards tornano normali se selezionati una seconda volta', () => {
        render(<App />)
        const cards = screen.getAllByTestId('card');
        const firstCard = cards[0]
        fireEvent.click(firstCard)
        expect(firstCard).toHaveStyle('border: 3px solid red')
        const secondCard = cards[1]
        fireEvent.click(secondCard)
        expect(firstCard).not.toHaveStyle('border: 3px solid red')
    })
})
