<>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='#'>
                <MDBNavbarBrand >  <img src={logoImage} alt="Logo" style={{ height: '80px' }} /></MDBNavbarBrand>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  onClick={handleAccueilClick}>Acceuil</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink >Contact</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => handleCategoryHeaderChange({ target: { value: 'espacesPubs' } })}>Espaces pub</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Select
  value={selectedCategoryHeader}
  onChange={handleCategoryHeaderChange} // Utilisation de la nouvelle fonction pour gérer le changement de catégorie
  displayEmpty
  variant="outlined"
  margin="dense"
  name="categories"
>
  <MenuItem value="">Les catégories</MenuItem>
  {allCategories.map((category) => (
    <MenuItem key={category.id} value={category.id}>
      {category.name}
    </MenuItem>
  ))}
</Select>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>