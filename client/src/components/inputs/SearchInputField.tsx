import { Dispatch, SetStateAction } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";

export interface SearchQuery {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
}

interface SearchInputFieldProps {
	name: string;
	query: SearchQuery;
	[x: string]: any;
}

export const SearchInputField = ({ name, query, ...props }: SearchInputFieldProps) => {
	return (
		<Container fluid>
			<Form.Group className="mb-3" controlId={`${name}-input`}>
				<InputGroup>
					<Form.Control
						{...props}
						onChange={(e) => {
							query.setSearchQuery(e.target.value);
						}}
					/>
				</InputGroup>
			</Form.Group>
		</Container>
	);
};
