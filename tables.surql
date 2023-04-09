define table categoria_receita schemafull;
DEFINE FIELD nome ON TABLE categoria_receita TYPE string
  ASSERT $value != NONE;

define table categoria_despesa schemafull;
define field nome on table categoria_despesa type string
  assert $value != NONE;

define table cartao_debito schemafull;
define field nome on table cartao_debito type string
  assert $value != NONE;
define field valor_inicial on table cartao_debito type int
  VALUE $value OR 0;
define field ativo on table cartao_debito type bool
  value true;

define table cartao_credito schemafull;
define field nome on table cartao_credito type string
  assert $value != NONE;
define field valor_inicial on table cartao_credito type int
  VALUE $value OR 0;
define field ativo on table cartao_credito type bool
  value true;

define table usuario schemafull;
define field nome on table usuario type string
  assert $value != NONE;
define field email on table usuario type string
  assert $value != NONE and is::email($value);
define field senha on table usuario type string
  assert $value != NONE;


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



