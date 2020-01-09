CREATE TABLE pitanja_za_profesora (
  id serial primary key,
  pitanje_tekst varchar(255),
  broj_odobrenja int,
  broj_odbijenica int,
  odgovoreno boolean default false,
  predavanje_id int,
  foreign key (predavanje_id) references predavanja(id)
);

alter table pitanja_za_profesora
add constraint unique_pitanje_tekst
unique (pitanje_tekst)