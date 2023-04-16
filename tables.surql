define table categoria schemafull;
DEFINE FIELD nome ON TABLE categoria TYPE string
  ASSERT $value != NONE;
DEFINE FIELD tipo ON TABLE categoria TYPE string
  ASSERT $value != NONE and $value inside ['receita', 'despesa'];
DEFINE INDEX categoria_index ON TABLE categoria COLUMNS nome UNIQUE;

define table cartao_debito schemafull;
define field nome on table cartao_debito type string
  assert $value != NONE;
define field valor_inicial on table cartao_debito type int
  VALUE $value OR 0;
define field ativo on table cartao_debito type bool
  value true;
DEFINE INDEX cartao_debito_index ON TABLE cartao_debito COLUMNS nome UNIQUE;

define table cartao_credito schemafull;
define field nome on table cartao_credito type string
  assert $value != NONE;
define field valor_inicial on table cartao_credito type int
  VALUE $value OR 0;
define field ativo on table cartao_credito type bool
  value true;
DEFINE INDEX cartao_credito_index ON TABLE cartao_credito COLUMNS nome UNIQUE;

define table usuario schemafull;
define field nome on table usuario type string
  assert $value != NONE;
define field email on table usuario type string
  assert $value != NONE and is::email($value);
define field senha on table usuario type string
  assert $value != NONE;
DEFINE INDEX userEmailIndex ON TABLE usuario COLUMNS email UNIQUE;


define table transacao schemafull;
define field data on table transacao type datetime
  assert $value != NONE;
define field valor on table transacao type int
  assert $value != 0;
define field descricao on table transacao type string
  assert $value != NONE;
define field categoria on table transacao type record(categoria_despesa, categoria_receita)
  assert $value != NONE;
define  field tipo_cartao on table transacao type string
  assert $value != NONE and $value inside ['debito', 'credito'];
define field cartao on table transacao type record(cartao_debito, cartao_credito)
  assert $value != NONE;
define field usuario on table transacao type record(usuario)
  assert $value != NONE;



