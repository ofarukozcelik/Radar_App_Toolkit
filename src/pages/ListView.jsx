import { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
const ListView = ({ setDetailId }) => {
  const { flights } = useSelector((store) => store.flight);
  // Slice methodunda kullanılacak ilk elemanın state'i
  const [itemOffset, setItemOffset] = useState(0);

  // Sayfa başına eleman sayısı
  const itemsPerPage = 10;
  // Slice methodunda kullanılacak son elemanın statei
  const endOffset = itemOffset + itemsPerPage;

  // Mevcut sayfadaki elemanları alma
  const currentItems = flights.slice(itemOffset, endOffset);
  // Maksimum sayfa sayısı
  const pageCount = Math.ceil(flights.length / itemsPerPage);
  console.log(pageCount);

  // Yeni sayfaya tıklanınca statei günceller
  const handlePageClick = (event) => {
    // Yeni sayfadaki elemanın dizideki sırasını beliler
    const newOffset = (event.selected * itemsPerPage) % flights.length;

    setItemOffset(newOffset);
  };
  return (
    <div className="p-4">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => setDetailId(flight.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination justify-content-center my-5"
        pageClassName="page-item"
        // "önceki" butonun bulunduğu liste öğesine uygulanacak sınıf
        previousClassName="page-item"
        // "sonraki" butonun bulunduğu liste öğesine uygulunacak sınıf
        nextClassName="page-item"
        // sayfa numaralarına uygulanacak sınıf
        pageLinkClassName="page-link"
        // "sonraki" butonuna uygulanacak sınıf
        nextLinkClassName="page-link"
        // "önceki" butonuna uygulanacak sınıf
        previousLinkClassName="page-link"
        // sayfa numaraları arasında boşluk bırakmak için kullanılan noktaya uygulanır
        breakClassName="page-link"
        // sayfa numaraları arasında boşluk bırakmak için kullanılan nokta
        breakLabel="..."
        nextLabel="İleri >"
        // sayfa numaraları değiştiğinde tetiklenecek fonksiyon
        onPageChange={handlePageClick}
        activeClassName="active"
        pageRangeDisplayed={5}
        // toplam sayfa sayısı
        pageCount={pageCount}
        previousLabel="< Geri"
        // sayfa sayısı sıfır olduğunda ne yapılacağını söyler
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ListView;
