import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';
import { CreateItemDto, Item } from '../types/item';
import { createItem, fetchItems, deleteItem, updateItemStatus } from '../services/itemService';

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleCreate = async (item: CreateItemDto) => {
    await createItem(item);
    loadItems();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    loadItems();
  };

  const handleClaim = async (id: string) => {
    await updateItemStatus(id, 'CLAIMED');
    loadItems();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Lost & Found Items</h2>
        <Button onClick={() => setShowForm(true)}>+ Add Item</Button>
      </div>

      <Row>
        {items.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <ItemCard 
              item={item} 
              onDelete={handleDelete}
              onClaim={item.status !== 'CLAIMED' ? handleClaim : undefined}
            />
          </Col>
        ))}
      </Row>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemForm onSubmit={handleCreate} />
        </Modal.Body>
      </Modal>
    </div>
  );
}