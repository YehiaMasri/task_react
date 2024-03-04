import "./dataTable.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

function Table() {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8000/items/all");
			setData(response.data);
			console.log(response.data[0].code);
		} catch (e) {
			console.log("Error fetching data", e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const initialQuantities = Array.from({ length: data.length }, () => 1);
	const [quantities, setQuantities] = useState(
		JSON.parse(localStorage.getItem("quantities")) || initialQuantities
	);

	useEffect(() => {
		localStorage.setItem("quantities", JSON.stringify(quantities));
	}, [quantities]);

	const handleIncrement = (index) => {
		const updatedQuantities = [...quantities];
		updatedQuantities[index] += 1;
		setQuantities(updatedQuantities);
	};

	const handleDecrement = (index) => {
		if (quantities[index] > 1) {
			const updatedQuantities = [...quantities];
			updatedQuantities[index] -= 1;
			setQuantities(updatedQuantities);
		}
	};

	const formattedData = data.reduce((acc, item) => {
		item.units.forEach((unit) => {
			acc.push([
				item.code,
				item.name,
				unit.name,
				unit.ItemUnit.price,
				quantities[item.id - 1],
				quantities[item.id - 1] * unit.ItemUnit.price,
			]);
		});
		return acc;
	}, []);

	const columns = [
		{
			name: "item_code",
			label: "Item Code",
		},
		{
			name: "item_name",
			label: "Item Name",
		},
		{
			name: "unit",
			label: "Units",
		},
		{
			name: "price",
			label: "Price",
		},
		{
			name: "qty",
			label: "Qty",
			options: {
				customBodyRenderLite: (index) => (
					<div>
						<div className="qty">{quantities[index]}</div>
						<div className="func">
							<button
								className="delete"
								onClick={() => handleDecrement(index)}
							>
								Decrase
							</button>

							<button
								className="increment"
								onClick={() => handleIncrement(index)}
							>
								Increment
							</button>
						</div>
					</div>
				),
			},
		},
		{
			name: "total",
			label: "Total",
			options: {
				customBodyRenderLite: (index) =>
					formattedData[index][3] * quantities[index],
			},
		},
	];

	const options = {
		selectableRows: "none",
		print: false,
		download: false,
		elevation: 0,
		pagination: true,
		rowsPerPage: 5,
        searchPlaceholder: "Search for Items",
		rowsPerPageOptions: [5],
	};

	return (
		<>
			<div>
				<MUIDataTable
					title={
						<div>
							<span className="title">Product List</span>
						</div>
					}
					data={formattedData}
					columns={columns}
					options={options}
				/>
			</div>
		</>
	);
}

export default Table;
